/**
 * ==============================================================================
 * RAGE LABS - GOOGLE APPS SCRIPT WEB APP FOR GOOGLE SHEETS
 * ==============================================================================
 * This script handles automated data logging for:
 *   1. Contact Us Messages      -> "Contact" sheet
 *   2. Startup Pitches           -> "Pitches" sheet
 *   3. Career Job Applications   -> "Applications" sheet (apply.html)
 *
 * HOW TO DEPLOY:
 *   1. Open your Google Sheet.
 *   2. Go to: Extensions -> Apps Script.
 *   3. Replace all existing code in Code.gs with this entire script.
 *   4. Click "Save" (disk icon).
 *   5. Click "Deploy" -> "Manage deployments" (or "New deployment").
 *   6. If managing deployment: Click the edit pencil icon, change Version to "New version", and click "Deploy".
 *      If new deployment: Select type "Web app", Description "Rage Labs API",
 *      Execute as: "Me", Who has access: "Anyone".
 *   7. Copy the Web App URL and ensure it matches `google.sheets.web.app.url`
 *      in your `backend/src/main/resources/application.properties`.
 * ==============================================================================
 */

function doPost(e) {
  return handleRequest(e);
}

function doGet(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  var lock = LockService.getScriptLock();
  // Wait up to 10 seconds for concurrent requests
  try {
    lock.waitLock(10000);
  } catch (err) {
    return createJsonResponse({
      result: "error",
      message: "Server is busy, please try again shortly."
    });
  }

  try {
    var p = (e && e.parameter) ? e.parameter : {};
    var formType = (p.formType || "contact").toLowerCase().trim();
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    if (formType === "pitch") {
      return handlePitchSubmission(ss, p);
    } else if (formType === "apply" || formType === "application" || formType === "career" || formType === "job") {
      return handleApplicationSubmission(ss, p);
    } else {
      return handleContactSubmission(ss, p);
    }
  } catch (error) {
    return createJsonResponse({
      result: "error",
      message: error.toString()
    });
  } finally {
    lock.releaseLock();
  }
}

/**
 * Handle Career / Job Applications (apply.html)
 */
function handleApplicationSubmission(ss, p) {
  var sheetName = "Applications";
  var headers = [
    "Timestamp",
    "Full Name",
    "Email",
    "Phone",
    "Location / Address",
    "Preferred Role",
    "Experience",
    "Key Skills",
    "LinkedIn Profile",
    "Portfolio / GitHub",
    "Referral Source",
    "Career Goals",
    "Why Rage Labs (Motivation)",
    "Resume File Name",
    "Status"
  ];

  var sheet = getOrCreateSheet(ss, sheetName, headers);

  var timestamp = p.timestamp || Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss");
  var fullName = p.fullName || p.name || "";
  var email = p.email || "";
  var phone = p.phone || "";
  var address = p.address || p.location || "";
  var preferredRole = p.preferredRole || "";
  var experience = p.experience || "";
  var skills = p.skills || "";
  var linkedin = p.linkedin || "";
  var portfolio = p.portfolio || "";
  var referralSource = p.referralSource || "";
  var careerGoals = p.careerGoals || "";
  var motivation = p.motivation || "";
  var resumeFileName = p.resumeFileName || "";
  var status = p.status || "pending";

  var row = [
    timestamp,
    fullName,
    email,
    phone,
    address,
    preferredRole,
    experience,
    skills,
    linkedin,
    portfolio,
    referralSource,
    careerGoals,
    motivation,
    resumeFileName,
    status
  ];

  sheet.appendRow(row);

  return createJsonResponse({
    result: "success",
    sheet: sheetName,
    message: "Application saved successfully"
  });
}

/**
 * Handle Startup Pitches (pitch.html)
 */
function handlePitchSubmission(ss, p) {
  var sheetName = "Pitches";
  var headers = [
    "Timestamp",
    "Founder Name",
    "Email",
    "LinkedIn",
    "Twitter / X",
    "Primary Role",
    "Weekly Hours",
    "Past Projects",
    "Project Name",
    "Problem",
    "Solution",
    "Target Audience",
    "MVP Feature 1",
    "MVP Feature 2",
    "MVP Feature 3",
    "Platform",
    "Integrations",
    "User Validation",
    "Acquisition Strategy",
    "Competitors",
    "Status"
  ];

  var sheet = getOrCreateSheet(ss, sheetName, headers);

  var timestamp = p.timestamp || Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss");
  var founderName = p.founderName || p.name || "";
  var email = p.email || "";
  var linkedin = p.linkedin || "";
  var twitter = p.twitter || "";
  var primaryRole = p.primaryRole || "";
  var weeklyHours = p.weeklyHours || "";
  var pastProjects = p.pastProjects || "";
  var projectName = p.projectName || "";
  var problem = p.problem || "";
  var solution = p.solution || "";
  var targetAudience = p.targetAudience || "";
  var mvpFeature1 = p.mvpFeature1 || "";
  var mvpFeature2 = p.mvpFeature2 || "";
  var mvpFeature3 = p.mvpFeature3 || "";
  var platform = p.platform || "";
  var integrations = p.integrations || "";
  var userValidation = p.userValidation || "";
  var acquisitionStrategy = p.acquisitionStrategy || "";
  var competitors = p.competitors || "";
  var status = p.status || "Pending";

  var row = [
    timestamp,
    founderName,
    email,
    linkedin,
    twitter,
    primaryRole,
    weeklyHours,
    pastProjects,
    projectName,
    problem,
    solution,
    targetAudience,
    mvpFeature1,
    mvpFeature2,
    mvpFeature3,
    platform,
    integrations,
    userValidation,
    acquisitionStrategy,
    competitors,
    status
  ];

  sheet.appendRow(row);

  return createJsonResponse({
    result: "success",
    sheet: sheetName,
    message: "Pitch saved successfully"
  });
}

/**
 * Handle Contact Messages (contact.html)
 */
function handleContactSubmission(ss, p) {
  var sheetName = "Contact";
  var headers = [
    "Timestamp",
    "Name",
    "Email",
    "Institution",
    "Profile Type",
    "Subject",
    "Message"
  ];

  var sheet = getOrCreateSheet(ss, sheetName, headers);

  var timestamp = p.timestamp || Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss");
  var name = p.name || "";
  var email = p.email || "";
  var institution = p.institution || "";
  var profileType = p.profileType || "";
  var subject = p.subject || "";
  var message = p.message || "";

  var row = [
    timestamp,
    name,
    email,
    institution,
    profileType,
    subject,
    message
  ];

  sheet.appendRow(row);

  return createJsonResponse({
    result: "success",
    sheet: sheetName,
    message: "Contact message saved successfully"
  });
}

/**
 * Helper to fetch a sheet or create it with styled headers if not existing
 */
function getOrCreateSheet(ss, sheetName, headers) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    sheet.appendRow(headers);

    // Style header row
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#1A1052");
    headerRange.setFontColor("#FFFFFF");
    sheet.setFrozenRows(1);

    // Auto-fit columns
    for (var i = 1; i <= headers.length; i++) {
      sheet.autoResizeColumn(i);
    }
  }
  return sheet;
}

/**
 * Helper to create JSON HTTP response
 */
function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
