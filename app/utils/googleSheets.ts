import './nodeCompat';

import { google } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';

// Google Sheets setup
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

/**
 * Creates a Google Sheets client with proper type handling
 */
export const getGoogleSheetsClient = async () => {
  try {
    // Validate required env vars
    if (!process.env.GOOGLE_CLIENT_EMAIL || 
        !process.env.GOOGLE_PRIVATE_KEY ||
        !process.env.GOOGLE_SHEET_ID) {
      throw new Error('Missing Google Sheets credentials');
    }
    
    // Make sure private key is formatted correctly
    const privateKey = process.env.GOOGLE_PRIVATE_KEY.includes('\\n') 
      ? process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
      : process.env.GOOGLE_PRIVATE_KEY;
    
    console.log('Creating Google Sheets client...');
    console.log(`Client email: ${process.env.GOOGLE_CLIENT_EMAIL}`);
    console.log(`Sheet ID: ${process.env.GOOGLE_SHEET_ID}`);
    
    // Create JWT client using direct import
    const auth = new GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: privateKey,
      },
      scopes: SCOPES,
    });

    const client = await auth.getClient();
    // Use explicit type assertion to handle type mismatch
    return google.sheets({ version: 'v4', auth: client as any });
  } catch (error) {
    console.error('Error creating Google Sheets client:', error);
    console.error('Details:', JSON.stringify(error, null, 2));
    throw new Error('Failed to create Google Sheets client');
  }
}; 