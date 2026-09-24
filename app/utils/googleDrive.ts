import './nodeCompat';

import { drive } from '@googleapis/drive';
import path from 'path';
import fs from 'fs';
import { GoogleAuth } from 'google-auth-library';

// Initialize a cache for the auth client to avoid recreating it for every request
let driveClient: any = null;

/**
 * Creates and returns an authenticated Google Drive client
 */
export const getGoogleDriveClient = async () => {
  console.log('Getting Google Drive client...');
  
  // If we already have a client, return it
  if (driveClient) {
    console.log('Using cached Drive client');
    return driveClient;
  }

  try {
    // Check if we have JSON credentials directly in environment variables
    if (process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
      console.log('Using GOOGLE_CLIENT_EMAIL and GOOGLE_PRIVATE_KEY for auth');
      console.log('Service account email:', process.env.GOOGLE_CLIENT_EMAIL);
      
      // Using existing service account credentials from env variables
      const credentials = {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        project_id: process.env.GOOGLE_PROJECT_ID || 'remnutri'
      };
      
      const auth = new GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/drive'],
      });
      
      // Create Drive client
      driveClient = drive({ version: 'v3', auth });
      console.log('Drive client created successfully');
      
      // Test the client with a simple call
      try {
        const about = await driveClient.about.get({
          fields: 'user,storageQuota'
        });
        console.log('Drive client test successful:', about.data.user?.emailAddress);
      } catch (testError) {
        console.error('Drive client test failed:', testError);
      }
      
      return driveClient;
    }
    // Alternative: Check if we're using a service account JSON string
    else if (process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
      const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
      
      const auth = new GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/drive'],
      });
      
      driveClient = drive({ version: 'v3', auth });
      return driveClient;
    }
    // Alternative: Check if we're using a service account file path
    else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      const auth = new GoogleAuth({
        keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
        scopes: ['https://www.googleapis.com/auth/drive'],
      });
      
      driveClient = drive({ version: 'v3', auth });
      return driveClient;
    } 
    // Fallback to other options
    else {
      console.warn('No Google service account credentials found. Using alternative auth method.');
      
      if (process.env.GOOGLE_API_KEY) {
        // Using API key (limited to public data only)
        driveClient = drive({
          version: 'v3',
          auth: process.env.GOOGLE_API_KEY
        });
        return driveClient;
      } else if (
        process.env.GOOGLE_CLIENT_ID &&
        process.env.GOOGLE_CLIENT_SECRET &&
        process.env.GOOGLE_REFRESH_TOKEN
      ) {
        // Using OAuth2 with refresh token
        const { OAuth2Client } = await import('google-auth-library');
        const oauth2Client = new OAuth2Client(
          process.env.GOOGLE_CLIENT_ID,
          process.env.GOOGLE_CLIENT_SECRET,
          'http://localhost:3000/oauth2callback'
        );
        
        oauth2Client.setCredentials({
          refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
        });
        
        driveClient = drive({ version: 'v3', auth: oauth2Client });
        return driveClient;
      } else {
        throw new Error('No valid Google Drive authentication method available');
      }
    }
  } catch (error) {
    console.error('Error creating Google Drive client:', error);
    throw error;
  }
};

/**
 * Uploads a file to Google Drive and returns the file ID
 * @param fileBuffer - Buffer containing file data
 * @param fileName - Name to use for the file in Google Drive
 * @param mimeType - MIME type of the file
 * @param folderId - Optional folder ID to place the file in (uses Drive root if not specified)
 * @returns The ID of the created file
 */
export const uploadFileToDrive = async (
  fileBuffer: Buffer,
  fileName: string,
  mimeType: string,
  folderId?: string
): Promise<string> => {
  console.log('Starting file upload to Google Drive...');
  console.log('File name:', fileName);
  console.log('MIME type:', mimeType);
  console.log('Folder ID:', folderId || 'Root folder (no ID provided)');
  console.log('File size:', fileBuffer.length, 'bytes');
  
  try {
    const drive = await getGoogleDriveClient();
    console.log('Drive client obtained for file upload');
    
    // Prepare file metadata
    const fileMetadata: any = {
      name: fileName,
    };
    
    // If folder ID provided, set parent folder
    if (folderId) {
      fileMetadata.parents = [folderId];
      console.log('Using provided folder ID as parent:', folderId);
    } else {
      // If no folder ID, try to put it in "My Drive"
      console.log('No folder ID provided, file will be created in root');
    }
    
    console.log('File metadata prepared:', JSON.stringify(fileMetadata));
    
    // Create temporary file from buffer
    const tempFilePath = path.join('/tmp', `${Date.now()}-${fileName}`);
    fs.writeFileSync(tempFilePath, fileBuffer);
    console.log('Temporary file created at:', tempFilePath);
    
    console.log('Starting upload to Google Drive...');
    // Upload file to Google Drive
    try {
      const response = await drive.files.create({
        requestBody: fileMetadata,
        media: {
          mimeType: mimeType,
          body: fs.createReadStream(tempFilePath),
        },
        fields: 'id,webViewLink,webContentLink,owners,permissions',
      });
      
      console.log('Upload successful!');
      console.log('File ID:', response.data.id);
      console.log('Web view link:', response.data.webViewLink);
      console.log('Web content link:', response.data.webContentLink);
      console.log('Owners:', JSON.stringify(response.data.owners));
      console.log('Permissions:', JSON.stringify(response.data.permissions));
      
      // Clean up temporary file
      fs.unlinkSync(tempFilePath);
      console.log('Temporary file cleaned up');
      
      // Make file publicly viewable (but not editable)
      console.log('Setting file permissions...');
      try {
        const permissionResponse = await drive.permissions.create({
          fileId: response.data.id,
          requestBody: {
            role: 'reader',
            type: 'anyone',
          },
        });
        console.log('Permission set successfully:', JSON.stringify(permissionResponse.data));
      } catch (permError) {
        console.error('Error setting permission:', permError);
      }
      
      // Return file information
      return response.data.id;
    } catch (uploadError) {
      console.error('Upload error:', uploadError);
      throw uploadError;
    }
  } catch (error) {
    console.error('Error uploading file to Google Drive:', error);
    throw error;
  }
};

/**
 * Gets a shareable link for a Google Drive file
 * @param fileId - The ID of the file to get a link for
 * @returns The web view link to the file
 */
export const getFileLink = async (fileId: string): Promise<string> => {
  console.log('Getting file link for ID:', fileId);
  
  try {
    const drive = await getGoogleDriveClient();
    
    const response = await drive.files.get({
      fileId,
      fields: 'webViewLink,webContentLink',
    });
    
    console.log('File link obtained:', response.data.webViewLink);
    console.log('File content link:', response.data.webContentLink);
    
    return response.data.webViewLink || response.data.webContentLink;
  } catch (error) {
    console.error('Error getting file link:', error);
    throw error;
  }
};

/**
 * Creates a folder in Google Drive if it doesn't exist
 * @param folderName - Name of the folder to create
 * @param parentFolderId - Optional parent folder ID
 * @returns The ID of the created or existing folder
 */
export const createDriveFolder = async (
  folderName: string,
  parentFolderId?: string
): Promise<string> => {
  console.log('Creating/finding folder in Google Drive...');
  console.log('Folder name:', folderName);
  console.log('Parent folder ID:', parentFolderId || 'Root folder (no parent ID)');
  
  try {
    const drive = await getGoogleDriveClient();
    console.log('Drive client obtained for folder creation');
    
    // Build the query to check if folder exists
    let query = `mimeType='application/vnd.google-apps.folder' and name='${folderName}' and trashed=false`;
    
    // If parent folder ID is provided, add it to the query
    if (parentFolderId) {
      query += ` and '${parentFolderId}' in parents`;
    }
    
    console.log('Searching for existing folder with query:', query);
    
    const response = await drive.files.list({
      q: query,
      fields: 'files(id, name, parents)',
    });
    
    console.log('Folder search results:', JSON.stringify(response.data.files));
    
    if (response.data.files && response.data.files.length > 0) {
      // Folder exists, return its ID
      console.log('Folder already exists, using existing folder with ID:', response.data.files[0].id);
      return response.data.files[0].id;
    }
    
    console.log('Folder does not exist, creating new folder...');
    
    // Folder doesn't exist, create it
    const fileMetadata: any = {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
    };
    
    if (parentFolderId) {
      fileMetadata.parents = [parentFolderId];
      console.log('Using provided parent folder ID:', parentFolderId);
    }
    
    console.log('Creating folder with metadata:', JSON.stringify(fileMetadata));
    
    try {
      const folder = await drive.files.create({
        requestBody: fileMetadata,
        fields: 'id,webViewLink',
      });
      
      console.log('Folder created successfully!');
      console.log('New folder ID:', folder.data.id);
      console.log('Folder link:', folder.data.webViewLink);
      
      return folder.data.id;
    } catch (createError) {
      console.error('Error creating folder:', createError);
      throw createError;
    }
  } catch (error) {
    console.error('Error creating folder in Google Drive:', error);
    throw error;
  }
};

/**
 * A simple diagnostic function to check if Google Drive API is working
 */
export const testGoogleDriveConnection = async (): Promise<boolean> => {
  console.log('=== TESTING GOOGLE DRIVE CONNECTION ===');
  console.log('Test started at:', new Date().toISOString());
  
  try {
    console.log('Step 1: Creating Google Drive client');
    let drive;
    try {
      drive = await getGoogleDriveClient();
      console.log('✓ Drive client created successfully');
    } catch (clientError) {
      console.error('✗ Failed to create Drive client:');
      console.error('Error type:', clientError instanceof Error ? clientError.constructor.name : typeof clientError);
      console.error('Error message:', clientError instanceof Error ? clientError.message : String(clientError));
      if (clientError instanceof Error && clientError.stack) {
        console.error('Error stack:', clientError.stack);
      }
      return false;
    }
    
    // Try to get information about the user and Drive storage
    console.log('Step 2: Calling Drive API "about.get"');
    try {
      const about = await drive.about.get({
        fields: 'user,storageQuota'
      });
      
      console.log('✓ Google Drive connection test SUCCESSFUL');
      console.log('User email:', about.data.user?.emailAddress);
      console.log('Storage details:', {
        total: about.data.storageQuota?.limit,
        used: about.data.storageQuota?.usage,
        usedInTrash: about.data.storageQuota?.usageInTrash,
      });
      
      return true;
    } catch (apiError) {
      console.error('✗ Failed when calling Drive API:');
      console.error('Error type:', apiError instanceof Error ? apiError.constructor.name : typeof apiError);
      console.error('Error message:', apiError instanceof Error ? apiError.message : String(apiError));
      
      // Check for common auth issues
      const errorMsg = String(apiError);
      if (errorMsg.includes('invalid_grant')) {
        console.error('Auth issue: Invalid grant. Service account credentials might be expired or revoked.');
      } else if (errorMsg.includes('invalid_client')) {
        console.error('Auth issue: Invalid client. Client ID might be incorrect or the project might be disabled.');
      } else if (errorMsg.includes('access_denied')) {
        console.error('Auth issue: Access denied. Service account might not have required permissions.');
      } else if (errorMsg.includes('insufficientPermissions')) {
        console.error('Permission issue: Insufficient permissions. Drive API might need to be enabled.');
      }
      
      return false;
    }
  } catch (error) {
    console.error('=== Google Drive connection test FAILED ===');
    console.error('General error:', error);
    return false;
  }
}; 