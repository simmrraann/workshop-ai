/**
 * Google Apps Script for Workshop Registration Form
 * 
 * INSTRUCTIONS:
 * 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1AEEi0OOBUt9XQqB3WYsI3U_1upr4yPlUr_0Iy07x0sA/edit
 * 2. Go to Extensions > Apps Script
 * 3. Delete any existing code and paste this entire file
 * 4. Click "Deploy" > "New deployment"
 * 5. Click the gear icon next to "Select type" and choose "Web app"
 * 6. Set "Execute as" to "Me"
 * 7. Set "Who has access" to "Anyone"
 * 8. Click "Deploy"
 * 9. Copy the Web App URL and add it to your .env file as VITE_GOOGLE_SHEETS_WEB_APP_URL
 */

// Replace with your actual Sheet ID (found in the URL)
const SHEET_ID = '1AEEi0OOBUt9XQqB3WYsI3U_1upr4yPlUr_0Iy07x0sA';
const SHEET_NAME = 'Sheet1'; // Change if your sheet has a different name

/**
 * Handle POST request from the registration form
 */
function doPost(e) {
  try {
    // Parse the JSON data from the request
    const data = JSON.parse(e.postData.contents);
    
    // Open the spreadsheet
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    
    // Prepare the row data in the correct order:
    // Full Name | Email | Contact Number | Payment status | Id | Expectations | Notes
    const rowData = [
      data.fullName || '',           // Column A: Full Name
      data.email || '',               // Column B: Email
      data.contactNumber || '',       // Column C: Contact Number
      data.paymentStatus || 'Pending', // Column D: Payment status
      data.registrationId || '',     // Column E: Id
      data.expectations || '',        // Column F: Expectations
      data.notes || ''                // Column G: Notes
    ];
    
    // Add timestamp and source if you want to track them
    // You may need to adjust column positions if your sheet structure is different
    
    // Append the row to the sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true, 
        message: 'Registration submitted successfully',
        registrationId: data.registrationId 
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle GET request (for testing)
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      message: 'Google Sheets Web App is running',
      status: 'OK'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

