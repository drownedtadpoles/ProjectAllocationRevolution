function checkValue() {
  var spreadsheetId = "1VXYBfgkbLyicINChPBk7vPlSq5n4YJstg5yw-1oJfU4";
  var sheetName = "Form Responses 1"; 
  var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
  
  var startRow = 2; 
  var lastRow = sheet.getLastRow();
  var range = sheet.getRange(startRow, 1, lastRow - startRow + 1, sheet.getLastColumn());
  var values = range.getValues();

  for (var i = 0; i < values.length; i++) {
    var row = values[i];
    var valueF = row[5];
    var valueJ = row[9]; 
    var cellK = sheet.getRange(startRow + i, 11); 

    if (valueJ === true && valueF !== "") {
      cellK.setValue("Completed");
      } else if (valueF !== "") {
        cellK.setValue("In Progress");
        } else {
        cellK.setValue("Unassigned")
    }
  }
}
