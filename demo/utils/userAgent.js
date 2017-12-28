'use strict';
const uaParser = require('ua-parser-js');

module.exports = function(ua) {
  ua = ua || '';
  return userAgent(ua);
};

const broswerNameReg = /(Android|MIUI|WeChat)/i;
const osNameReg = /(Android|iOS)/i;

function userAgent(ua) {
  const uaInfo = uaParser(ua);
  return {
    mobile: uaInfo.device.type === 'mobile' ||
      (uaInfo.os.name && uaInfo.os.name.match(osNameReg)) ||
      (uaInfo.browser.name && uaInfo.browser.name.match(broswerNameReg)),
    wechat: ua.match(/micromessenger/i) ||
      (uaInfo.browser.name && uaInfo.browser.name.match(/WeChat/i)),
  };
}
