import { NextResponse } from "next/server";
import { getGoogleSheetsClient } from "@/app/utils/googleSheets";
import { sendEmailSafely, TEAM_EMAIL } from "@/app/utils/email";
import { generateEmailContent } from "./email-template";


const SHEET_NAME = "Health Assessments";

/**
 * Writes the submission to Google Sheets. Throws on failure so the caller can
 * report it without losing the email step.
 */
async function storeInGoogleSheets(data: any) {
  const sheets = await getGoogleSheetsClient();

  // First, get the spreadsheet to check if our sheet exists
  const spreadsheet = await sheets.spreadsheets.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
  });

  // Check if our sheet exists
  const sheetExists = spreadsheet.data.sheets?.some(
    (sheet) => sheet.properties?.title === SHEET_NAME
  );

  if (!sheetExists) {
    // Create new sheet if it doesn't exist
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      requestBody: {
        requests: [
          {
            addSheet: {
              properties: {
                title: SHEET_NAME,
              },
            },
          },
        ],
      },
    });

    // Add headers to the new sheet
    const headers = [
      "Timestamp",
      "Name",
      "Email",
      "Phone",
      "Age",
      "Gender",
      "Weight (kg)",
      "Height (cm)",
      "BMI",
      "Health Conditions",
      "Weight Goal",
      "Activity Level",
      "Current Diet",
      "Lifestyle Factors",
      "Allergies",
      "Medications",
      "Recommended Program",
    ];

    await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: `${SHEET_NAME}!A1:Q1`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [headers],
      },
    });
  }

  // Format the data for Google Sheets
  const rowData = [
    data.timestamp || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    data.name,
    data.email,
    data.phone,
    data.age,
    data.gender,
    data.weight,
    data.height,
    data.bmi?.toFixed(1) || "",
    data.healthConditions.join(", "),
    data.weightGoal,
    data.activityLevel,
    data.currentDiet,
    data.lifestyleFactors.join(", "),
    data.allergies || "",
    data.medications || "",
    data.recommendedProgram.join(", "),
  ];

  // Append data to Google Sheets
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: `${SHEET_NAME}!A:Q`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [rowData],
    },
  });
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data?.email) {
      return NextResponse.json(
        { success: false, error: "Email address is required" },
        { status: 400 }
      );
    }

    // 1. Store the submission. Kept independent of the email step below: a Sheets
    //    outage must not stop the user receiving their report.
    let stored = false;
    let storageError: string | undefined;
    try {
      await storeInGoogleSheets(data);
      stored = true;
    } catch (error: any) {
      storageError = error?.message || String(error);
      console.error("[health-assessment] failed to store in Google Sheets:", error);
    }

    // 2. Notify the team.
    const teamEmail = await sendEmailSafely("health-assessment:team", {
      to: TEAM_EMAIL,
      subject: "New Health Assessment Submission",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333333;">
          <h1 style="color: #004d40;">New Health Assessment Submission</h1>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
          <p><strong>Program:</strong> ${data.recommendedProgram?.join(', ') || 'Not provided'}</p>
          <p><strong>BMI:</strong> ${data.bmi?.toFixed(1) || 'Not provided'}</p>
          <p><strong>Health Conditions:</strong> ${data.healthConditions?.join(', ') || 'None'}</p>
          <p><strong>Lifestyle Factors:</strong> ${data.lifestyleFactors?.join(', ') || 'None'}</p>
          <p><strong>Submitted at:</strong> ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
          ${storageError ? `<p style="color:#b00020;"><strong>Note:</strong> this submission could not be saved to Google Sheets (${storageError}). The details above are the only record.</p>` : ''}
        </div>
      `,
    });

    // 3. Send the assessment report to the user.
    const userEmail = await sendEmailSafely("health-assessment:user", {
      to: data.email,
      subject: "Your Health Assessment Report - Rem Nutri",
      html: generateEmailContent(data),
    });

    // Nothing was captured at all - the submission is lost, so say so.
    if (!stored && !teamEmail.sent) {
      return NextResponse.json(
        {
          success: false,
          stored,
          emailSent: false,
          error: "We could not process your assessment. Please try again later.",
          details: { storage: storageError, email: teamEmail.error },
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      stored,
      emailSent: teamEmail.sent && userEmail.sent,
      reportEmailSent: userEmail.sent,
      ...(userEmail.error || teamEmail.error || storageError
        ? {
            warnings: {
              ...(storageError ? { storage: storageError } : {}),
              ...(teamEmail.error ? { teamEmail: teamEmail.error } : {}),
              ...(userEmail.error ? { userEmail: userEmail.error } : {}),
            },
          }
        : {}),
    });
  } catch (error) {
    console.error("Error in health assessment submission:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process health assessment" },
      { status: 500 }
    );
  }
}
