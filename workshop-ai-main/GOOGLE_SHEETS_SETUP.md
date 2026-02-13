# Google Sheets Integration Setup Guide

This guide will help you connect your registration form to your Google Sheet.

## Step 1: Set Up Google Apps Script

1. **Open your Google Sheet:**
   - Go to: https://docs.google.com/spreadsheets/d/1AEEi0OOBUt9XQqB3WYsI3U_1upr4yPlUr_0Iy07x0sA/edit

2. **Open Apps Script:**
   - Click on **Extensions** → **Apps Script**
   - This opens a new tab with the Apps Script editor

3. **Paste the Code:**
   - Delete any existing code in the editor
   - Open the file `google-apps-script.js` in this project
   - Copy the entire contents and paste it into the Apps Script editor

4. **Save the Script:**
   - Click the **Save** icon (💾) or press `Ctrl+S` / `Cmd+S`
   - Give it a name like "Workshop Registration Handler"

5. **Deploy as Web App:**
   - Click **Deploy** → **New deployment**
   - Click the gear icon (⚙️) next to "Select type"
   - Choose **Web app**
   - Configure:
     - **Description:** Workshop Registration API
     - **Execute as:** Me (your-email@gmail.com)
     - **Who has access:** Anyone
   - Click **Deploy**
   - Click **Authorize access** and follow the prompts to grant permissions
   - **Copy the Web App URL** (it looks like: `https://script.google.com/macros/s/...`)

## Step 2: Configure Environment Variables

1. **Create a `.env` file** in the root of your project (same folder as `package.json`)

2. **Add the following line:**
   ```
   VITE_GOOGLE_SHEETS_WEB_APP_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```
   Replace `YOUR_SCRIPT_ID` with the actual URL you copied from Step 1.

3. **Restart your development server:**
   - Stop the current server (`Ctrl+C`)
   - Run `npm run dev` again

## Step 3: Test the Integration

1. Open your website
2. Click "REGISTER NOW"
3. Fill out the form with test data
4. Submit the form
5. Check your Google Sheet - you should see a new row with the registration data

## Data Structure

The form sends the following data to your Google Sheet:

| Column | Field | Description |
|--------|-------|-------------|
| A | Full Name | User's full name |
| B | Email | User's email address |
| C | Contact Number | Phone/WhatsApp number |
| D | Payment Status | Default: "Pending" |
| E | Id | Auto-generated REG-xxxxx |
| F | Expectations | Optional user expectations |
| G | Notes | Blank (for your use) |

**Note:** The script also includes timestamp and source ("Instagram") in the data, but you may need to adjust the column mapping in the Apps Script if your sheet structure is different.

## Troubleshooting

### Form submits but data doesn't appear in sheet:
- Check the browser console (F12) for errors
- Verify the Web App URL in `.env` is correct
- Make sure the Apps Script is deployed and set to "Anyone" access
- Check Apps Script execution logs: Apps Script → Executions

### CORS errors:
- Make sure the Web App is deployed with "Anyone" access
- The script should handle CORS automatically

### Permission errors:
- Re-authorize the Apps Script deployment
- Make sure you're the owner of the Google Sheet

## Security Note

The `.env` file should NOT be committed to Git. It's already in `.gitignore`. For production deployment, add the environment variable through your hosting platform's settings (Vercel, Netlify, etc.).

