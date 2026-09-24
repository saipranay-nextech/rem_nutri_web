import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

/**
 * Single place where outbound mail is configured and sent.
 *
 * Every route used to build its own nodemailer transport inline, which meant one
 * bad credential broke four features with no single place to see it. Routes should
 * call `sendEmailSafely` and surface the returned `sent` flag to the caller.
 */

// Placeholder values from the setup guide; treated as "not configured".
const PLACEHOLDER_VALUES = new Set([
  'your_actual_email@gmail.com',
  'your_16_character_app_password',
]);

/** Public site origin, used for links and images inside email bodies. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://rem-nutri-web.vercel.app'
).replace(/\/+$/, '');

/**
 * Where team/support notifications go. Defaults to the sending mailbox so existing
 * behaviour is unchanged; set EMAIL_TO to route them somewhere else (e.g. support@).
 */
export const TEAM_EMAIL = process.env.EMAIL_TO || process.env.EMAIL_USER || '';

/**
 * Returns a human-readable reason when mail cannot be sent, or null when the
 * configuration looks usable.
 */
export function getEmailConfigError(): string | null {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASSWORD;

  if (!user || !pass) {
    return 'EMAIL_USER and/or EMAIL_PASSWORD are not set';
  }
  if (PLACEHOLDER_VALUES.has(user) || PLACEHOLDER_VALUES.has(pass)) {
    return 'EMAIL_USER/EMAIL_PASSWORD still contain placeholder values';
  }
  return null;
}

export const isEmailConfigured = () => getEmailConfigError() === null;

let transporter: Transporter | null = null;

function getTransporter(): Transporter {
  const configError = getEmailConfigError();
  if (configError) {
    throw new Error(`Email not configured: ${configError}`);
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.zoho.in',
      port: Number(process.env.EMAIL_PORT || 465),
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  return transporter;
}

/** Turns transport errors into something actionable in a log line. */
function describeEmailError(error: any): string {
  if (error?.code === 'EAUTH') {
    return 'SMTP authentication failed - the mailbox password/app password is wrong, expired or revoked';
  }
  if (error?.code === 'ECONNECTION' || error?.code === 'ETIMEDOUT') {
    return 'Could not reach the SMTP server';
  }
  if (error?.responseCode === 550 || error?.responseCode === 553) {
    return 'The SMTP server rejected the recipient or sender address';
  }
  return error?.message || String(error);
}

export interface SendEmailOptions {
  to: string;
  subject: string;
  html?: string;
  text?: string;
}

/** Sends one email. Throws if it could not be sent. */
export async function sendEmail({ to, subject, html, text }: SendEmailOptions) {
  const info = await getTransporter().sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    html,
  });

  console.log(`[email] sent "${subject}" to ${to} (id: ${info.messageId})`);
  return info;
}

export interface SendEmailResult {
  sent: boolean;
  error?: string;
}

/**
 * Sends one email without throwing, logging failures loudly so they are visible in
 * hosting logs. `label` identifies the caller, e.g. "health-assessment:user".
 *
 * A failure here must never be swallowed silently by the caller: include the
 * returned `sent` flag in the API response so the client knows what happened.
 */
export async function sendEmailSafely(
  label: string,
  options: SendEmailOptions
): Promise<SendEmailResult> {
  const configError = getEmailConfigError();
  if (configError) {
    console.error(`[email] SKIPPED ${label} -> ${options.to}: ${configError}`);
    return { sent: false, error: configError };
  }

  try {
    await sendEmail(options);
    return { sent: true };
  } catch (error: any) {
    const reason = describeEmailError(error);
    console.error(`[email] FAILED ${label} -> ${options.to}: ${reason}`, error);
    return { sent: false, error: reason };
  }
}
