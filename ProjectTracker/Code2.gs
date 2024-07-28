function updateAssignerIDs() {
  var sheet1Id = "1VXYBfgkbLyicINChPBk7vPlSq5n4YJstg5yw-1oJfU4";
  var sheet2Id = "1YZw49tSd8eoB-UR1xaEJrce4YvM1e1SXdg80_DMJZFc";
  
  var ss1 = SpreadsheetApp.openById(sheet1Id);
  var ss2 = SpreadsheetApp.openById(sheet2Id);
  
  var sheet1 = ss1.getSheetByName("Form Responses 1"); 
  var sheet2 = ss2.getSheetByName("Sheet1"); 
  var data1 = sheet1.getDataRange().getValues();
  var data2 = sheet2.getDataRange().getValues();
  
  for (var i = 1; i < data1.length; i++) {
    var assignerEmail = data1[i][11];
    var assignerId = data1[i][4];
    
    for (var j = 1; j < data2.length; j++) {
      var userEmail = data2[j][5];
      var userId = data2[j][1];
      
      if (assignerEmail === userEmail) {
        sheet1.getRange(i + 1, 5).setValue(userId);
        break;
      }
    }
  }
}
