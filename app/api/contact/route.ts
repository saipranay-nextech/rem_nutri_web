import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getGoogleSheetsClient } from '@/app/utils/googleSheets';
import { sendEmailSafely, SITE_URL, TEAM_EMAIL } from '@/app/utils/email';

// Google Sheets setup
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
const SHEET_NAME = 'ContactSubmissions';

// Fallback local storage setup - only enabled in development
const DATA_DIR = path.join(process.cwd(), 'data');
const CONTACTS_FILE = path.join(DATA_DIR, 'contacts.json');

// Initialize local storage if needed (only in development)
if (process.env.NODE_ENV !== 'production') {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(CONTACTS_FILE)) {
    fs.writeFileSync(CONTACTS_FILE, JSON.stringify([], null, 2));
  }
}

// Function to store contact information in Google Sheets
const storeContactInGoogleSheets = async (contactData: any, timestamp: string) => {
  try {
    const { firstName, lastName, email, service, message } = contactData;
    const sheets = await getGoogleSheetsClient();
    
    // First, get the existing sheets in the spreadsheet
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID,
    });
    
    // Check if the ContactSubmissions sheet exists
    const contactSheet = spreadsheet.data.sheets?.find(
      sheet => sheet.properties?.title === SHEET_NAME
    );
    
    // If the ContactSubmissions sheet doesn't exist, create it
    if (!contactSheet) {
      console.log(`Creating new sheet named '${SHEET_NAME}'`);
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
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
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A1:F1`,
        valueInputOption: 'RAW',
        requestBody: {
          values: [['First Name', 'Last Name', 'Email', 'Service', 'Message', 'Timestamp']],
        },
      });
    }
    
    // Append new contact data
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:F`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [[firstName, lastName, email, service, message, timestamp]],
      },
    });
    
    console.log(`Contact from ${email} stored in Google Sheets at ${timestamp}`);
    return true;
  } catch (error: any) {
    console.error('Google Sheets error:', error);
    return false;
  }
};

// Function to store contact information locally
const storeContactLocally = async (contactData: any, timestamp: string) => {
  try {
    // Read current contacts
    const contactsRaw = fs.readFileSync(CONTACTS_FILE, 'utf8');
    const contacts = JSON.parse(contactsRaw || '[]');
    
    // Add new contact with timestamp
    contacts.push({ ...contactData, timestamp });
    
    // Write back to file
    fs.writeFileSync(CONTACTS_FILE, JSON.stringify(contacts, null, 2));
    
    console.log(`Contact from ${contactData.email} stored locally at ${timestamp}`);
    return true;
  } catch (error) {
    console.error('Error storing contact locally:', error);
    return false;
  }
};

const validServices = [
  'rembliss',
  'remprotein',
  'remfit',
  'rembalance',
  'remmeta',
  'remdia'
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, service, message } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !service || !message) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate service
    if (!validServices.includes(service)) {
      return NextResponse.json(
        { message: 'Invalid service selected' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Add timestamp
    const timestamp = new Date().toISOString();
    let storedSuccessfully = false;
    let emailSentSuccessfully = false;
    
    // 1. Try to store in Google Sheets
    const googleSheetsSuccess = await storeContactInGoogleSheets(body, timestamp);
    
    // 2. If Google Sheets fails or as a backup, store locally
    if (!googleSheetsSuccess) {
      console.log('Falling back to local storage for contact data');
      storedSuccessfully = await storeContactLocally(body, timestamp);
    } else {
      storedSuccessfully = true;
    }
    
    // 3. Notify the team and confirm to the user
    const teamEmail = await sendEmailSafely('contact:team', {
      to: TEAM_EMAIL,
      subject: 'New Contact Form Submission',
      html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333333;">
            <h1 style="color: #004d40;">New Contact Form Submission</h1>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Service:</strong> ${service}</p>
            <p><strong>Message:</strong></p>
            <p style="padding: 15px; background-color: #f7f7f7; border-radius: 5px;">${message}</p>
            <p><strong>Submitted at:</strong> ${new Date(timestamp).toLocaleString()}</p>
          </div>
        `,
    });

    const userEmail = await sendEmailSafely('contact:user', {
      to: email,
      subject: 'We received your message - RemNutri',
      html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333333;">
            <h1 style="color: #004d40;">Thank You for Contacting Us!</h1>
            <p>Hello ${firstName},</p>
            <p>Thank you for reaching out to RemNutri. We have received your message and will get back to you as soon as possible.</p>
            <p>Here's a summary of your inquiry:</p>
            <div style="margin: 30px 0; padding: 15px; background-color: #f7f7f7; border-radius: 5px;">
              <p><strong>Service:</strong> ${service}</p>
              <p><strong>Message:</strong> ${message}</p>
            </div>
            <p>If you have any urgent questions, please contact us directly at <a href="tel:8450 9087" style="color: #004d40; text-decoration: none;">8450 9087</a></p>
            <p>Best regards,<br>The RemNutri Team</p>
            <hr style="border: 1px solid #eeeeee; margin: 20px 0;">
            <p style="font-size: 12px; color: #777777;">
              RemNutri Health Private Limited<br>
              <a href="${SITE_URL}" style="color: #004d40; text-decoration: none;">www.remnutri.com</a>
            </p>
          </div>
        `,
    });

    emailSentSuccessfully = teamEmail.sent && userEmail.sent;
    
    // 4. Return appropriate response
    if (storedSuccessfully && emailSentSuccessfully) {
      return NextResponse.json(
        { 
          success: true,
          emailSent: true,
          message: 'Thank you for your message! We will get back to you soon.',
          data: {
            firstName,
            lastName,
            email,
            service,
            message
          }
        },
        { status: 200 }
      );
    } else if (storedSuccessfully) {
      return NextResponse.json({ 
        success: true, 
        emailSent: false,
        message: 'Thank you for your message! We have received your inquiry, but could not send a confirmation email.',
        warnings: {
          ...(teamEmail.error ? { teamEmail: teamEmail.error } : {}),
          ...(userEmail.error ? { userEmail: userEmail.error } : {}),
        },
      });
    } else {
      // Critical error - couldn't store contact information
      return NextResponse.json({ 
        success: false, 
        message: 'We could not process your request. Please try again later or contact us directly.' 
      }, { status: 500 });
    }
    
  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'An error occurred while processing your request' 
    }, { status: 500 });
  }
} 