/**
 * This Google Apps Script is designed to be deployed as a web app. 
 * It receives registration data from a web form via a POST request and records it in a Google Sheet.
 *
 * To use this script:
 * 1. Create a new Google Sheet and a new Google Apps Script project.
 * 2. Paste this code into the script editor.
 * 3. Set up the Google Sheet with the required headers (see the `sheetHeaders` object).
 * 4. Deploy the script as a web app and grant it the necessary permissions.
 * 5. Copy the web app URL and paste it into your frontend application.
 */

// The name of the Google Sheet where registration data will be stored.
const sheetName = 'Registrations';

// An object defining the headers for the Google Sheet.
// The order of these headers is important and must match the order in your Google Sheet.
const sheetHeaders = {
  fullName: "Full Name",
  email: "Email",
  contactNumber: "Contact Number",
  paymentStatus: "Payment Status",
  registrationId: "Registration ID",
  expectations: "Expectations",
  notes: "Notes",
};

/**
 * This function is the entry point for all POST requests to the web app.
 * It parses the incoming data, validates it, and then adds it to the Google Sheet.
 *
 * @param {Object} e - The event parameter for a POST request.
 * @returns {ContentService.TextOutput} - A JSON response indicating the status of the operation.
 */
function doPost(e) {
  try {
    // Parse the incoming JSON data from the request body.
    const data = JSON.parse(e.postData.contents);

    // Validate the incoming data.
    if (!data.fullName || !data.email || !data.contactNumber || !data.registrationId) {
      return ContentService.createTextOutput(JSON.stringify({ result: 'error', message: 'Missing required fields' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Get the active Google Sheet and the specific sheet by name.
    let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);

    // If the sheet does not exist, create it with the defined headers.
    if (!sheet) {
      sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet(sheetName);
      sheet.appendRow(Object.values(sheetHeaders));
    }

    // Create a new row with the data in the correct order.
    const newRow = Object.keys(sheetHeaders).map(header => data[header] || '');

    // Append the new row to the sheet.
    sheet.appendRow(newRow);

    // Return a success response.
    return ContentService.createTextOutput(JSON.stringify({ result: 'success', data: JSON.stringify(data) }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Log the error for debugging.
    Logger.log(error.toString());

    // Return an error response.
    return ContentService.createTextOutput(JSON.stringify({ result: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
