const xml = require('xml');

module.exports = genWechatXml;

function genWechatXml(params) {
  const keyArr = [];
  for (const key in params) {
    const o = {};
    o[key] = { _cdata: params[key], };
    keyArr.push(o);
  }
  const msg = xml(keyArr);
  return `<xml>${msg}</xml>`;
}
