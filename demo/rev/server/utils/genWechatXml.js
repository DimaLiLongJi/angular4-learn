'use strict';

const xml = require('xml');

module.exports = genWechatXml;

function genWechatXml(params) {
  const xmlArr = buildXmlArr(params);
  const msg = xml(xmlArr);
  console.log('msg=', msg);
  return `<xml>${msg}</xml>`;
}

function buildXmlArr(data) {
  const arr = [];
  for (const key in data) {
    const obj = {};
    if (typeof data[key] === 'object') {
      const o = buildXmlArr(data[key]);
      obj[key] = o;
    } else {
      obj[key] = { _cdata: data[key] };
    }
    arr.push(obj);
  }
  return arr;
}