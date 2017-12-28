'use strict';

const Excel = require('exceljs');

module.exports = parseX;

function parseX(filename) {

  let workbook = new Excel.Workbook();
  return workbook.xlsx.readFile(filename).then(() => {
    let rows = [];
    workbook.eachSheet(worksheet => {
      let keys = [];
      worksheet.eachRow((row, rowNum) => {
        if (rowNum === 1) {
          keys = getHeaders(row);
        }
        if (rowNum > 1) {
          let obj = collectRowObj(row, keys);
          obj.sheet = worksheet.name;
          rows.push(obj);
        }
      });
    });
    return rows;
  });
}

function getHeaders(row) {
  let rowValue = [];
  let cellNum = 0;
  while (++cellNum) {
    if (!row.getCell(cellNum).value) {
      if (cellNum < 2) {
        rowValue.push(cellNum);
      } else {
        break;
      }
    } else {
      rowValue.push(row.getCell(cellNum).value);
    }
  }
  return rowValue;
}

function collectRowObj(row, headers) {
  let rowObj = {};
  headers.forEach((key, idx) => {
    rowObj[key] = row.getCell(idx + 1).value;
  });
  return rowObj;
}