'use strict';

/**
 * @param  {str} email 要使用的邮件模板文件夹 cd-daily-report
 * @param  {str} sms 要使用的短信模板文件夹 cd-daily-report
 * @param  {obj} data 需要render的数据
 * @return {obj} email.title 邮件标题
 * @return {obj} email.content 邮件内容
 * @return {obj} sms.content 短信内容
 */
let render = (() => {
  var _ref = _asyncToGenerator(function* (params) {
    const result = Object.assign({}, params);
    const mailTitlePath = `${basePath}${params.email}/email-title`;
    const mailContentPath = `${basePath}${params.email}/email-content`;
    const smsPath = `${basePath}${params.email}/sms-content`;
    const notificationPath = `${basePath}${params.email}/notification-content`;

    // 对邮件模板的渲染
    if (params.email) {
      result.email = {};
      result.email.title = yield renderOne(mailTitlePath, params.data);
      result.email.content = yield renderOne(mailContentPath, params.data);
    }
    // 对短信模板的渲染
    if (params.sms) {
      result.sms = {};
      result.sms.content = yield renderOne(smsPath, params.data);
    }
    // 对短信模板的渲染
    if (params.notification) {
      result.notification = {};
      result.notification.content = yield renderOne(notificationPath, params.data);
    }

    return result;
  });

  return function render(_x) {
    return _ref.apply(this, arguments);
  };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const app = require('../app');

module.exports = render;

const basePath = 'template/';

function renderOne(ejsPath, data) {
  return new Promise(resolve => {
    app.render(ejsPath, data, (err, str) => {
      if (err) {
        console.error(err);
        resolve();
      } else {
        resolve(str.replace(/\s+/g, ' '));
      }
    });
  });
}