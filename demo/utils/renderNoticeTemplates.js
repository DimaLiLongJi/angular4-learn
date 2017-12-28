const app = require('../app');

module.exports = render;

const basePath = 'template/';

/**
 * @param  {str} email 要使用的邮件模板文件夹 cd-daily-report
 * @param  {str} sms 要使用的短信模板文件夹 cd-daily-report
 * @param  {obj} data 需要render的数据
 * @return {obj} email.title 邮件标题
 * @return {obj} email.content 邮件内容
 * @return {obj} sms.content 短信内容
 */
async function render(params) {
  const result = Object.assign({}, params);
  const mailTitlePath = `${basePath}${params.email}/email-title`;
  const mailContentPath = `${basePath}${params.email}/email-content`;
  const smsPath = `${basePath}${params.email}/sms-content`;
  const notificationPath = `${basePath}${params.email}/notification-content`;

  // 对邮件模板的渲染
  if (params.email) {
    result.email = {};
    result.email.title = await renderOne(mailTitlePath, params.data);
    result.email.content = await renderOne(mailContentPath, params.data);
  }
  // 对短信模板的渲染
  if (params.sms) {
    result.sms = {};
    result.sms.content = await renderOne(smsPath, params.data);
  }
  // 对短信模板的渲染
  if (params.notification) {
    result.notification = {};
    result.notification.content = await renderOne(notificationPath, params.data);
  }

  return result;
}

function renderOne(ejsPath, data) {
  return new Promise((resolve) => {
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
