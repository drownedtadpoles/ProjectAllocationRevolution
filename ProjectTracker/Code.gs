function setDefaultCompletedValue() {
  var spreadsheetId = "1VXYBfgkbLyicINChPBk7vPlSq5n4YJstg5yw-1oJfU4";
  var sheetName = "Form Responses 1"; 
  var defaultCompletedValue = "FALSE"; 
  var defaultStatusValue = "Unassigned"; 
  var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
  var lastRow = sheet.getLastRow();
  var range = sheet.getRange(lastRow, 10);
  var range1 = sheet.getRange(lastRow, 11);  

  if (range.getValue() === "" && range1.getValue() === "") {
    range.setValue(defaultCompletedValue);
    range1.setValue(defaultStatusValue);
  }
}

function onAssigneeChange(e) {

  var sheetName = "Form Responses 1";
  var spreadsheetId = "1VXYBfgkbLyicINChPBk7vPlSq5n4YJstg5yw-1oJfU4";
  var sheetName = "Form Responses 1"; 
  var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);

  var editedRange = e.range;
  var editedRow = editedRange.getRow();

  Logger.log("Edited Row: "+ editedRow);
  if (editedRange.getColumn() === 6) { 
    var assigneeId = sheet.getRange(editedRow, 6).getValue(); 
    Logger.log("Assignee ID: "+ assigneeId);

    if (assigneeId) {

      var rowData = sheet.getRange(editedRow, 1, 1, sheet.getLastColumn()).getValues()[0];

      var taskID = rowData[0];
      var taskName = rowData[2];
      var description = rowData[3];
      var projectEndDate = new Date(rowData[6]);
      var assignerEmail = rowData[11]; // Assuming Assigner Email is in the 12th column (index 11)

      var employeeRolesSpreadsheetId = "1YZw49tSd8eoB-UR1xaEJrce4YvM1e1SXdg80_DMJZFc";
      var rolesSheet = SpreadsheetApp.openById(employeeRolesSpreadsheetId).getSheetByName("Sheet1");

      var rolesData = rolesSheet.getDataRange().getValues();

      var assigneeEmail = '';
      var assigneeName = '';
      for (var j = 1; j < rolesData.length; j++) { 
        console.log(j)
        if (rolesData[j][1] == assigneeId) { 
          assigneeName = rolesData[j][2]; 
          assigneeEmail = rolesData[j][5];
          break;
        }
      }
      
      if (assigneeEmail) {
        sendEmailToEmployee(assigneeEmail, assigneeName, taskName, taskID, assignerEmail, description);
        createCalendarEvent(assigneeEmail, assigneeName, taskName, projectEndDate);
      } else {
        Logger.log('Assignee email not found for ID: ' + assigneeId);
      }
    }
  }
}

function sendEmailToEmployee(email, employeeName, taskName, taskID, assignerEmail, description) {
  var subject = "Project "+ taskID+ " Assigned";
  var body = "Dear "+ employeeName +",\n\nYou have been assigned a new project. Your project ID is: " + taskID + ".\nProject Name: "+ taskName + "\nProject Description: "+ description +"\n\nBest regards,\n"+ assignerEmail;
  Logger.log("Sending email to: " + email);
  MailApp.sendEmail(email, subject, body);
}

//Create a Calendar Event for Employee to notify their deadlines
function createCalendarEvent(email, employeeName, projectID, projectEndDate) {
  var calendar = CalendarApp.getDefaultCalendar();
  var eventTitle = "Project Deadline: " + projectID;
  var eventDescription = "Dear "+ employeeName+",\n\nYou have been assigned a new project. Your project ID is: " + projectID + ".\nThe project deadline is: " + projectEndDate + ".\n\nBest regards,\nThe Company";

  calendar.createEvent(eventTitle, new Date(projectEndDate), new Date(projectEndDate), {
    description: eventDescription,
    guests: email
  });

  Logger.log("Calendar event created for: " + email + " with project ID: " + projectID + " and deadline: " + projectEndDate);
}

function testOnAssigneeChange() {
  var spreadsheetId = "1VXYBfgkbLyicINChPBk7vPlSq5n4YJstg5yw-1oJfU4";
  var sheetName = "Form Responses 1";
  var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
  
  // Define the row where Assignee ID was added
  var editedRow = sheet.getLastRow(); 

  var e = {
    source: SpreadsheetApp.openById(spreadsheetId),
    range: sheet.getRange(editedRow, 6) 
  };

  onAssigneeChange(e);
}
