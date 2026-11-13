/**
 * Recibe los datos del formulario y los guarda en Google Sheets.
 * Pegar en: Hoja de cálculo > Extensiones > Apps Script
 */
const SHEET_NAME = 'Leads';
const HEADERS = ['Fecha','Nombre','WhatsApp','Para quién','Edad','Programa','Turno','Origen','UTM','Estatus'];

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sh.getLastRow() === 0) {
      sh.appendRow(HEADERS);
      sh.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold').setBackground('#0a1f44').setFontColor('#ffffff');
      sh.setFrozenRows(1);
    }
    sh.appendRow([d.fecha, d.nombre, "'" + d.whatsapp, d.paraQuien, d.edad, d.programa, d.turno, d.origen, d.utm, 'Nuevo']);

    // Opcional: aviso por correo a la escuela (descomenta y cambia el correo)
    // MailApp.sendEmail('correo@gbxcanatun.com', 'Nuevo lead: ' + d.nombre,
    //   d.nombre + ' · ' + d.whatsapp + '\n' + d.programa + ' · ' + d.turno);

    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) })).setMimeType(ContentService.MimeType.JSON);
  }
}
