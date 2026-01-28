/**
 * 1. 主程式入口：處理網頁顯示
 */
function doGet(e) {
  // 檢查是否為 Google 驗證檔名 (保留你原本的驗證邏輯)
  var queryString = JSON.stringify(e);
  if (queryString.indexOf('googleb12c76fd7471dc73') !== -1) {
    return ContentService.createTextOutput("google-site-verification: googleb12c76fd7471dc73.html")
                         .setMimeType(ContentService.MimeType.TEXT);
  }

  // 判斷要開啟哪一個頁面，預設為 'Index'
  var page = (e && e.parameter && e.parameter.page) ? e.parameter.page : 'Index';
  
  try {
    // 使用樣板服務讀取 HTML 檔案
    // 注意：請確保左側檔案名稱為小寫的 index (不要有 .html)
    var template = HtmlService.createTemplateFromFile(page);
    
    return template.evaluate()
      .setTitle('八毅活動工程 - 卓越專業執行')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
      
  } catch (err) {
    // 如果找不到頁面，回傳錯誤訊息
    return HtmlService.createHtmlOutput("抱歉，找不到頁面：" + page);
  }
}

/**
 * 2. 引入外部檔案函式 (用於 HTML 中 <?!= include('檔名') ?>)
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * 3. 處理表單提交 (保留你原本的寫入試算表功能)
 */
function processForm(formData) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheets()[0];
    sheet.appendRow([
      new Date(), 
      formData.name, 
      formData.contact, 
      formData.date, 
      formData.data
    ]);
    return "成功";
  } catch (e) {
    return "失敗：" + e.toString();
  }
}
