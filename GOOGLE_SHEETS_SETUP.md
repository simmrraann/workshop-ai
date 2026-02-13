# Google Sheets Integration Setup Guide

This guide will walk you through the process of setting up a Google Sheet to collect data from your web form. You will create a Google Sheet, a Google Apps Script, and deploy it as a web app. This will allow your form to send data directly to your sheet.

## Step 1: Create a Google Sheet and Apps Script

1.  **Create a new Google Sheet:**
    *   Go to [sheets.new](https://sheets.new) in your browser.
    *   Rename the sheet to something descriptive, like "Workshop Registrations."

2.  **Add headers to your sheet:**
    *   In the first row of your sheet, add the following headers:
        *   `Registration ID`
        *   `Full Name`
        *   `Email`
        *   `Contact Number`
        *   `Expectations`
        *   `Notes`
        *   `Payment Status`

3.  **Open the Apps Script editor:**
    *   In your Google Sheet, go to **Extensions > Apps Script**.
    *   This will open a new script project.

4.  **Paste the provided code:**
    *   Copy the code from the `google-apps-script.js` file and paste it into the script editor, replacing any existing code.
    *   Save the script by clicking the floppy disk icon or pressing `Ctrl+S` (`Cmd+S` on Mac).

## Step 2: Deploy the Web App

1.  **Deploy the script:**
    *   Click the **Deploy** button in the top-right corner of the Apps Script editor and select **New deployment**.

2.  **Configure the deployment:**
    *   For **Select type**, choose **Web app**.
    *   In the **Description** field, add a brief description like "Workshop Registration Form Handler."
    *   For **Execute as**, select **Me**.
    *   For **Who has access**, select **Anyone**.
    *   Click **Deploy**.

3.  **Authorize the script:**
    *   Google will ask you to authorize the script. Follow the on-screen instructions.
    *   You may see a warning that the app isn't verified. Click **Advanced** and then **Go to [Your Script Name] (unsafe)**.
    *   Allow the script to access your Google Sheets.

4.  **Get the web app URL:**
    *   After deployment, you will get a **Web app URL**. Copy this URL.

## Step 3: Update Your Frontend Code

1.  **Paste the URL into your React app:**
    *   Open the `src/App.tsx` file in your project.
    *   Find the line that says `const googleScriptUrl = 'YOUR_GOOGLE_APPS_SCRIPT_URL';`.
    *   Replace `'YOUR_GOOGLE_APPS_SCRIPT_URL'` with the URL you copied in the previous step.

2.  **You're all set!**
    *   Now, when a user submits the registration form, the data will be sent to your Google Sheet.
