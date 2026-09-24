import { NextResponse, NextRequest } from 'next/server';
import { sendEmailSafely, SITE_URL, TEAM_EMAIL } from '@/app/utils/email';
import fs from 'fs';
import path from 'path';
import { getGoogleSheetsClient } from '@/app/utils/googleSheets';
import { 
  getGoogleDriveClient, 
  createDriveFolder, 
  uploadFileToDrive, 
  getFileLink 
} from '@/app/utils/googleDrive';

// Constants
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
const SHEET_NAME = 'CareerApplications';
const USER_EMAIL = 'navnitnaman374@gmail.com'; // User's personal email

// Local storage setup (development fallback)
const DATA_DIR = path.join(process.cwd(), 'data');
const CAREERS_FILE = path.join(DATA_DIR, 'careers.json');

// Initialize local storage if in development
if (process.env.NODE_ENV !== 'production') {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(CAREERS_FILE)) {
      fs.writeFileSync(CAREERS_FILE, JSON.stringify([], null, 2));
    }
  } catch (error) {
    console.error('Failed to initialize local storage:', error);
  }
}

/**
 * API route handler for career applications
 */
export async function POST(req: NextRequest) {
  console.log('=============== CAREERS API CALLED ===============');
  console.log('Time:', new Date().toISOString());

  try {
    // 1. Parse the request data
    console.log('Step 1: Parsing request data');
    const contentType = req.headers.get('content-type') || '';
    console.log('Content-Type:', contentType);
    
    let applicationData: Record<string, any> = {};
    let resumeFile: Buffer | null = null;
    let resumeFileName = '';
    let resumeMimeType = '';
    
    // Handle different content types
    if (contentType.includes('multipart/form-data')) {
      try {
        console.log('Parsing multipart form data');
        const formData = await req.formData();
        console.log('Form fields received:', [...formData.keys()].join(', '));
        
        // Extract form fields
        applicationData = {
          firstName: formData.get('firstName') || '',
          lastName: formData.get('lastName') || '',
          email: formData.get('email') || '',
          phone: formData.get('phone') || '',
          position: formData.get('position') || '',
          coverLetter: formData.get('coverLetter') || '',
        };
        
        // Extract resume file
        const resume = formData.get('resume') as File | null;
        if (resume) {
          console.log('Resume file found:', resume.name, resume.size, resume.type);
          resumeFile = Buffer.from(await resume.arrayBuffer());
          resumeFileName = resume.name;
          resumeMimeType = resume.type;
          console.log('Resume buffer created:', resumeFile.length, 'bytes');
        } else {
          console.log('No resume file found in form data');
        }
      } catch (formError) {
        console.error('Error parsing form data:', formError);
        return NextResponse.json({
          success: false,
          message: 'Failed to process form data',
          error: String(formError)
        }, { status: 400 });
      }
    } else {
      // Handle JSON request (less common for file uploads)
      try {
        console.log('Parsing JSON data');
        applicationData = await req.json();
        console.log('Application data parsed from JSON');
      } catch (jsonError) {
        console.error('Error parsing JSON data:', jsonError);
        return NextResponse.json({
          success: false,
          message: 'Failed to parse JSON data',
          error: String(jsonError)
        }, { status: 400 });
      }
    }
    
    // 2. Validate the application data
    console.log('Step 2: Validating application data');
    const { firstName, lastName, email, position } = applicationData;
    
    if (!firstName || !lastName || !email || !position) {
      console.log('Missing required fields');
      return NextResponse.json({
        success: false,
        message: 'Please fill in all required fields (name, email, position)'
      }, { status: 400 });
    }
    
    if (!email.includes('@')) {
      console.log('Invalid email format');
      return NextResponse.json({
        success: false,
        message: 'Please enter a valid email address'
      }, { status: 400 });
    }
    
    if (!resumeFile && !applicationData.resumeFilename) {
      console.log('No resume provided');
      return NextResponse.json({
        success: false,
        message: 'Please upload your resume'
      }, { status: 400 });
    }
    
    // Add timestamp
    const timestamp = new Date().toISOString();
    applicationData.submittedAt = timestamp;
    let resumeLink = '';
    
    // 3. Process file upload (if provided)
    let uploadError: string | null = null;
    if (resumeFile) {
      console.log('Step 3: Processing file upload');
      try {
        // 3.1 Create Google Drive folder structure
        console.log('Creating Drive folder structure');

        // First, create or find the main "RemNutri Resumes" folder
        const mainFolderName = 'RemNutri Resumes';
        console.log(`Creating/finding main folder: "${mainFolderName}"`);
        
        const mainFolderId = await createDriveFolder(mainFolderName);
        console.log('Main folder created/found:', mainFolderId);
        
        // Next, create a subfolder for the position/job title
        const positionFolderName = `${position} Applications`;
        console.log(`Creating position folder: "${positionFolderName}"`);
        
        const positionFolderId = await createDriveFolder(
          positionFolderName,
          mainFolderId // Make this a subfolder of the main folder
        );
        console.log('Position folder created/found:', positionFolderId);
        
        // Finally, create a folder for this specific candidate
        const candidateFolderName = `${firstName} ${lastName} - ${new Date().toISOString().split('T')[0]}`;
        console.log(`Creating candidate folder: "${candidateFolderName}"`);
        
        const candidateFolderId = await createDriveFolder(
          candidateFolderName,
          positionFolderId // Make this a subfolder of the position folder
        );
        console.log('Candidate folder created/found:', candidateFolderId);
        
        // 3.2 Upload resume file
        console.log('Uploading resume file');
        const fileId = await uploadFileToDrive(
          resumeFile,
          resumeFileName,
          resumeMimeType,
          candidateFolderId // Upload to the candidate's folder
        );
        console.log('File uploaded, ID:', fileId);
        
        // 3.3 Get shareable link
        resumeLink = await getFileLink(fileId);
        console.log('File link generated:', resumeLink);
        
        // Add file info to application data
        applicationData.resumeFilename = resumeFileName;
        applicationData.resumeSize = resumeFile.length;
        applicationData.resumeLink = resumeLink;
        applicationData.fileId = fileId;
        applicationData.mainFolderId = mainFolderId;
        applicationData.positionFolderId = positionFolderId;
        applicationData.candidateFolderId = candidateFolderId;
        
        // 3.4 Share with user's personal account
        console.log('Sharing files and folders with personal account');
        try {
          const drive = await getGoogleDriveClient();
          
          // Share the main folder with the user (this will give access to all subfolders)
          console.log('Sharing main folder with personal account');
          await drive.permissions.create({
            fileId: mainFolderId,
            requestBody: {
              role: 'writer',
              type: 'user',
              emailAddress: USER_EMAIL
            },
            emailMessage: 'All resume applications are organized in this folder.',
            sendNotificationEmail: true
          });
          console.log('Main folder shared with', USER_EMAIL);
        } catch (shareError) {
          console.error('Error sharing with personal account:', shareError);
          // Continue processing - this is not critical
        }
      } catch (fileError) {
        console.error('File upload error:', fileError);
        uploadError = String(fileError);
        // Continue processing even if file upload fails
      }
    }
    
    // 4. Store application data
    console.log('Step 4: Storing application data');
    let storageSuccess = false;
    
    // 4.1 Try Google Sheets
    try {
      console.log('Storing in Google Sheets');
      const sheets = await getGoogleSheetsClient();
      
      // Check if sheet exists, create if needed
      const spreadsheet = await sheets.spreadsheets.get({
        spreadsheetId: SPREADSHEET_ID,
      });
      
      const careerSheet = spreadsheet.data.sheets?.find(
        sheet => sheet.properties?.title === SHEET_NAME
      );
      
      if (!careerSheet) {
        console.log(`Creating new sheet named '${SHEET_NAME}'`);
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId: SPREADSHEET_ID,
          requestBody: {
            requests: [{
              addSheet: {
                properties: {
                  title: SHEET_NAME,
                },
              },
            }],
          },
        });
        
        // Add headers
        await sheets.spreadsheets.values.update({
          spreadsheetId: SPREADSHEET_ID,
          range: `${SHEET_NAME}!A1:J1`,
          valueInputOption: 'RAW',
          requestBody: {
            values: [['First Name', 'Last Name', 'Email', 'Phone', 'Position', 'Resume', 'File Size', 'Resume Link', 'Additional Information', 'Timestamp']],
          },
        });
      }
      
      // Append new application data
      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A:J`,
        valueInputOption: 'RAW',
        requestBody: {
          values: [[
            firstName, 
            lastName, 
            email, 
            applicationData.phone || 'Not provided', 
            position,
            resumeFileName || applicationData.resumeFilename || 'No resume',
            resumeFile ? (resumeFile.length / 1024 / 1024).toFixed(2) + ' MB' : 'N/A',
            resumeLink || applicationData.resumeLink || 'No link',
            applicationData.coverLetter || 'None provided',
            timestamp
          ]],
        },
      });
      
      console.log('Data stored in Google Sheets');
      storageSuccess = true;
    } catch (sheetsError) {
      console.error('Google Sheets error:', sheetsError);
      
      // 4.2 Fall back to local storage
      try {
        if (process.env.NODE_ENV !== 'production') {
          console.log('Falling back to local storage');
          
          const dataToStore = {
            ...applicationData,
            timestamp,
          };
          
          const applicationsRaw = fs.readFileSync(CAREERS_FILE, 'utf8');
          const applications = JSON.parse(applicationsRaw || '[]');
          applications.push(dataToStore);
          fs.writeFileSync(CAREERS_FILE, JSON.stringify(applications, null, 2));
          
          console.log('Data stored locally');
          storageSuccess = true;
        }
      } catch (localError) {
        console.error('Local storage error:', localError);
      }
    }
    
    // 5. Send notification emails
    console.log('Step 5: Sending notification emails');

    const teamEmail = await sendEmailSafely('careers:team', {
      to: TEAM_EMAIL,
      subject: 'New Career Application Submission',
      html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333333;">
              <h1 style="color: #004d40;">New Career Application Submission</h1>
              <p><strong>Name:</strong> ${firstName} ${lastName}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${applicationData.phone || 'Not provided'}</p>
              <p><strong>Position:</strong> ${position}</p>
              <p><strong>Resume:</strong> ${resumeLink ? `<a href="${resumeLink}" target="_blank">${resumeFileName || applicationData.resumeFilename}</a>` : (resumeFileName || applicationData.resumeFilename)} ${resumeFile ? `(${(resumeFile.length / 1024 / 1024).toFixed(2)} MB)` : ''}</p>
              ${applicationData.coverLetter ? `<p><strong>Additional Information:</strong></p>
              <p style="padding: 15px; background-color: #f7f7f7; border-radius: 5px;">${applicationData.coverLetter}</p>` : ''}
              <p><strong>Submitted at:</strong> ${new Date(timestamp).toLocaleString()}</p>
            </div>
          `,
    });

    const applicantEmail = await sendEmailSafely('careers:applicant', {
      to: email,
      subject: 'Your Application has been received - RemNutri',
      html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333333;">
              <h1 style="color: #004d40;">Thank You for Your Application!</h1>
              <p>Hello ${firstName},</p>
              <p>Thank you for applying to join the RemNutri team. We have received your application for the <strong>${position}</strong> position and will review it shortly.</p>
              <p>If your qualifications match our requirements, our HR team will contact you for the next steps in the hiring process.</p>
              <p>We appreciate your interest in joining our organization and wish you the best in your job search.</p>
              <p>Best regards,<br>The RemNutri Team</p>
              <hr style="border: 1px solid #eeeeee; margin: 20px 0;">
              <p style="font-size: 12px; color: #777777;">
                RemNutri Health Private Limited<br>
                <a href="${SITE_URL}" style="color: #004d40; text-decoration: none;">www.remnutri.com</a>
              </p>
            </div>
          `,
    });

    const emailSuccess = teamEmail.sent && applicantEmail.sent;
    
    // 6. Return appropriate response
    console.log('Step 6: Returning response');
    
    if (storageSuccess) {
      let message = 'Thank you for your application! We will review it and contact you if your qualifications match our requirements.';
      
      if (!emailSuccess) {
        message += ' (Note: We could not send a confirmation email.)';
      }
      
      return NextResponse.json({
        success: true,
        emailSent: emailSuccess,
        message,
        resumeLink,
        uploadError,
        ...(teamEmail.error || applicantEmail.error
          ? {
              warnings: {
                ...(teamEmail.error ? { teamEmail: teamEmail.error } : {}),
                ...(applicantEmail.error ? { applicantEmail: applicantEmail.error } : {}),
              },
            }
          : {}),
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'We could not process your application. Please try again later or contact us directly.',
        resumeLink,
        uploadError
      }, { status: 500 });
    }
  } catch (error) {
    // Global error handler
    console.error('CRITICAL ERROR in careers API:', error);
    return NextResponse.json({
      success: false,
      message: 'An unexpected error occurred. Please try again later.',
      error: String(error)
    }, { status: 500 });
  } finally {
    console.log('=============== CAREERS API COMPLETED ===============');
  }
} 