/**
 * BACKEND SCRIPT FOR "STOP SCROLLING. START BUILDING."
 * * 1. Paste this into your Google Apps Script editor.
 * 2. Save.
 * 3. Click "Deploy" -> "New Deployment" -> Select "Web App".
 * 4. Set "Who can access" to "Anyone".
 * 5. Deploy and COPY the URL.
 * 6. Paste the URL into your App.tsx file.
 */

const sheetName = 'Registrations';

// Headers for the sheet
const sheetHeaders = {
  fullName: "Full Name",
  email: "Email",
  contactNumber: "Contact Number",
  paymentStatus: "Payment Status",
  registrationId: "Registration ID",
  expectations: "Expectations",
  notes: "Notes",
  timestamp: "Timestamp"
};

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    if (!data.fullName || !data.email || !data.contactNumber) {
      return ContentService.createTextOutput(JSON.stringify({ result: 'error', message: 'Missing fields' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
    if (!sheet) {
      sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet(sheetName);
      sheet.appendRow(Object.values(sheetHeaders));
    }

    // Add Timestamp
    const timestamp = new Date().toLocaleString();

    // Append to Google Sheet
    sheet.appendRow([
      data.fullName,
      data.email,
      data.contactNumber,
      data.paymentStatus,
      data.registrationId,
      data.expectations,
      data.notes,
      timestamp
    ]);

    // --- SEND EMAIL AUTOMATION ---
    sendConfirmationEmail(data.email, data.fullName);

    return ContentService.createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ result: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Sends the "Cool/Gen-Z" confirmation email
 */
function sendConfirmationEmail(email, name) {
  const subject = "You're in! 🍵 Let's build something crazy.";
  
  // HTML Body for the email (Looks nicer)
  const htmlBody = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <h2 style="color: #333;">Hey ${name}! ✨</h2>
      <p style="font-size: 16px; color: #555;">
        You made the list! You’re officially confirmed for our hangout session: 
        <strong style="color: #d63384;">"Stop Scrolling. Start Building."</strong>
      </p>
      
      <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 5px 0;"><strong>🗓 When:</strong> This Saturday @ 4:00 PM</p>
        <p style="margin: 5px 0;"><strong>📍 Where:</strong> (Link will be sent to this email 1 hour before)</p>
        <p style="margin: 5px 0;"><strong>💸 Cost:</strong> ₹0 (Just bring your vibe)</p>
      </div>

      <p style="font-size: 16px; color: #555;">
        <strong>What to expect?</strong><br>
        No boring lectures. Just me (Simran) and Pranjali spilling the tea on AI, content creation, and how to actually get things done without burning out.
      </p>

      <p style="font-size: 14px; color: #888; font-style: italic;">
        ⚠️ <strong>Warning:</strong> We have a tiny surprise for the top 3 people who bring the most energy, so come ready to chat!
      </p>

      <p style="margin-top: 30px; font-size: 16px;">
        See ya there,<br>
        <strong>Simran & Pranjali 🚀</strong>
      </p>
    </div>
  `;

  // Plain text fallback
  const textBody = `Hey ${name}!\n\nYou're confirmed for "Stop Scrolling. Start Building."\n\nWhen: This Saturday @ 4:00 PM\nWhere: Link sent 1 hour before.\n\nSee ya there,\nSimran & Pranjali`;

  MailApp.sendEmail({
    to: email,
    subject: subject,
    htmlBody: htmlBody,
    body: textBody
  });
}
// ... existing code ...

function FORCE_EMAIL_PERMISSIONS() {
  // 👇 PUT YOUR EMAIL HERE JUST FOR TESTING
  sendConfirmationEmail("simmraannsinghh@gmail.com", "Simran Test");
}