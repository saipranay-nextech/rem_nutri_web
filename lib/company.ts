/**
 * Single source of truth for company and legal details.
 *
 * Every policy page and contact block reads from here, so there is one place to
 * update and no way to leave template placeholders behind (the Privacy Policy
 * previously shipped with "Business Name" and "www.website.com" in it).
 *
 * Values marked TO CONFIRM are required for Razorpay merchant onboarding and
 * must be filled in before going live. `missingCompanyDetails()` below lists
 * whatever is still blank.
 */

export const COMPANY = {
  /** Registered legal entity name. Must match the Razorpay account exactly. */
  legalName: "RemNutri Health Private Limited",
  /** Public-facing brand. */
  brandName: "RemDi",
  /** Primary domain, without protocol. */
  domain: "remdi.in",
  /** Full site origin used in policy text. */
  siteUrl: "https://remdi.in",

  supportEmail: "Support@remdi.in",
  /** Display form of the support number. */
  phoneDisplay: "+91 72076 46868",
  /** tel: form - digits and leading + only. */
  phoneHref: "+917207646868",

  // ---------------------------------------------------------------------------
  // TO CONFIRM - required before submitting to Razorpay
  // ---------------------------------------------------------------------------

  /**
   * Full registered business address, exactly as it appears on the company's
   * KYC documents. Shown on the Contact page, in the footer and in the policies.
   */
  registeredAddress: "",

  /** GSTIN, if the company is registered. Leave blank if not applicable. */
  gstin: "",

  /** Days before a programme starts during which a customer may cancel. */
  cancellationWindowDays: 7,

  /** Working days taken to process an approved refund back to source. */
  refundProcessingDays: "5-7",

  /** Working days to dispatch physical meal deliveries after an order. */
  mealDispatchDays: "2-3",
} as const;

/** Convenience: a value that is still blank renders as a visible placeholder. */
export const orPlaceholder = (value: string, label: string) =>
  value.trim() ? value : `[${label} — to be added]`;

/**
 * Names the company details that are still blank. Useful as a pre-launch check:
 * every entry returned here is something Razorpay onboarding will ask for.
 */
export function missingCompanyDetails(): string[] {
  const missing: string[] = [];
  if (!COMPANY.registeredAddress.trim()) missing.push("registeredAddress");
  if (!COMPANY.gstin.trim()) missing.push("gstin (omit if not GST-registered)");
  return missing;
}

/** Programme pricing shown on the Services page and used in the policies. */
export interface ProgramPrice {
  id: string;
  name: string;
  /** Price in INR. Null until confirmed - the UI then shows "Contact us". */
  priceInr: number | null;
  /** e.g. "12 weeks", "3 months". */
  duration: string;
  summary: string;
}

// TO CONFIRM: real INR prices for each programme. Razorpay requires customers to
// be able to see what they are paying for before checkout.
export const PROGRAM_PRICES: ProgramPrice[] = [
  { id: "remdia",     name: "RemDia",      priceInr: null, duration: "12 weeks", summary: "Type 2 and Pre-Diabetes reversal programme" },
  { id: "rembliss",   name: "Rem Bliss",   priceInr: null, duration: "12 weeks", summary: "Women's health programme for PCOS/PCOD and menopause" },
  { id: "remmeta",    name: "Rem Meta",    priceInr: null, duration: "12 weeks", summary: "Metabolic health, including high blood pressure" },
  { id: "remfit",     name: "Rem Fit",     priceInr: null, duration: "12 weeks", summary: "Intensive weight loss, 4-5 kg per month" },
  { id: "rembalance", name: "Rem Balance", priceInr: null, duration: "12 weeks", summary: "Weight maintenance through balanced nutrition" },
  { id: "remprotein", name: "Rem Protein", priceInr: null, duration: "12 weeks", summary: "Protein-led nutrition for healthy weight gain" },
];

export const formatInr = (amount: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);
