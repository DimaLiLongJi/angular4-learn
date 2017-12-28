'use strict';

const Excel = require('exceljs');
const logger = require('./logger')('sheet-writer');

function SheetWriter(filename, sheetname) {
	const workbook = new Excel.Workbook();
	const worksheet = workbook.addWorksheet(sheetname || 'sheet1');
	const header = worksheet.getRow(1);
	const keys = [];
	let rowNum = 2;

	function writeRow(obj) {
		// []
		const row = worksheet.getRow(rowNum);
		for (const key in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, key)) {
				const foundKey = keys.find(k => k.value === key);
				if (foundKey) {
					row.getCell(foundKey.index).value = obj[key];
				} else {
					const newKey = {
						index: keys.length + 1,
						value: key
					};
					keys.push(newKey);
					addHeader(newKey);
					row.getCell(newKey.index).value = obj[key];
				}
			}
		}
		rowNum++;
	}

	function addHeader(k) {
		header.getCell(k.index).value = k.value;
	}

	function finish() {
		workbook.xlsx.writeFile(filename).then(() => {
			logger.info('worksheet wrote into: ', filename);
		});
	}

	this.writeRow = writeRow;
	this.finish = finish;
}
module.exports = SheetWriter;