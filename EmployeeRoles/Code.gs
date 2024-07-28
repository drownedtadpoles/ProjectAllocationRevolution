function updateSkillGrades() {
  var sheet1Id = '1VXYBfgkbLyicINChPBk7vPlSq5n4YJstg5yw-1oJfU4';
  var sheet2Id = '1YZw49tSd8eoB-UR1xaEJrce4YvM1e1SXdg80_DMJZFc';
  
  var sheet1 = SpreadsheetApp.openById(sheet1Id).getSheetByName('Form Responses 1'); 
  var sheet2 = SpreadsheetApp.openById(sheet2Id).getSheetByName('Sheet1'); 

  var sheet1Data = sheet1.getDataRange().getValues();
  var sheet2Data = sheet2.getDataRange().getValues();

  var userIdToRowMap = {};
  for (var i = 1; i < sheet2Data.length; i++) {
    var userId = sheet2Data[i][1];
    userIdToRowMap[userId] = i;
  }

  for (var j = 1; j < sheet1Data.length; j++) {
    var assignerId = sheet1Data[j][4]; 
    var completed = sheet1Data[j][10];

    if (completed === "Completed") {
      var rowIndex = userIdToRowMap[assignerId];
      if (rowIndex !== undefined) {
        var currentSkillGrade = sheet2Data[rowIndex][4];
        sheet2.getRange(rowIndex + 1, 5).setValue(currentSkillGrade + 0.1); 
      }
    }
  }
}
