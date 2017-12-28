const config = require('config');
const renderNoticeTemplates = require('./renderNoticeTemplates.js');
const emailService = require('../services/email-service');
const smsService = require('../services/sms-service');
const logger = require('./logger')('utils: sendNoticeToOne');
const notificationService = require('../services/notice-center/notice');

module.exports = sendNoticeToOne;

async function sendNoticeToOne(person, templates, data) {
  // store all notice content relasted data into contentData
  const contentData = Object.assign({
    Name: person.name,
    to: person.email,
    mobile: person.mobile,
    prefixValue: person.prefix_value || person.mobilePrefix,
    prefix_value: person.prefix_value || person.mobilePrefix,
  }, data);
  contentData.Name = person.name;
  contentData.prefixValue = person.prefix_value || person.mobilePrefix;
  // render templates into html
  const renderParams = {
    data: Object.assign({}, contentData),
    email: templates.email,
    sms: templates.sms,
    notification: templates.notification,
  };
  const noticeContents = await renderNoticeTemplates(renderParams);

  if (noticeContents.email && noticeContents.email.title) {
    // build email data
    const emailData = Object.assign({}, contentData);
    emailData.type = 'TRIGGER';
    Object.assign(emailData, noticeContents.email);
    await emailService.sendEmail(emailData, {
      useBaseTemplate: false,
    });
  }

  if (noticeContents.sms && noticeContents.sms.content) {
    const smsData = Object.assign({}, contentData);
    Object.assign(smsData, noticeContents.sms);
    await smsService.sendSms(smsData)
      .catch((error) => {
        logger.error('smsService.sendSms error', error);
      });
  }

  if (noticeContents.notification && noticeContents.notification.content) {
    const notificationData = {
      appName: 'cf.admin',
      fromEntity: 'member',
      toEntity: 'member',
      fromId: 1,
      toId: person.id,
      content: noticeContents.notification.content,
      link: /^http/.test(data.notificationLink) ? data.notificationLink : `${config.baseUrls.BASE_URL}#${data.notificationLink}`
    };
    await notificationService.create(notificationData).catch(err => console.error(err));
  }
}
