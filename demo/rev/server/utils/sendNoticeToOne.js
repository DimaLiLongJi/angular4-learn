'use strict';

let sendNoticeToOne = (() => {
  var _ref = _asyncToGenerator(function* (person, templates, data) {
    // store all notice content relasted data into contentData
    const contentData = Object.assign({
      Name: person.name,
      to: person.email,
      mobile: person.mobile,
      prefixValue: person.prefix_value || person.mobilePrefix,
      prefix_value: person.prefix_value || person.mobilePrefix
    }, data);
    contentData.Name = person.name;
    contentData.prefixValue = person.prefix_value || person.mobilePrefix;
    // render templates into html
    const renderParams = {
      data: Object.assign({}, contentData),
      email: templates.email,
      sms: templates.sms,
      notification: templates.notification
    };
    const noticeContents = yield renderNoticeTemplates(renderParams);

    if (noticeContents.email && noticeContents.email.title) {
      // build email data
      const emailData = Object.assign({}, contentData);
      emailData.type = 'TRIGGER';
      Object.assign(emailData, noticeContents.email);
      yield emailService.sendEmail(emailData, {
        useBaseTemplate: false
      });
    }

    if (noticeContents.sms && noticeContents.sms.content) {
      const smsData = Object.assign({}, contentData);
      Object.assign(smsData, noticeContents.sms);
      yield smsService.sendSms(smsData).catch(function (error) {
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
      yield notificationService.create(notificationData).catch(function (err) {
        return console.error(err);
      });
    }
  });

  return function sendNoticeToOne(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const config = require('config');
const renderNoticeTemplates = require('./renderNoticeTemplates.js');
const emailService = require('../services/email-service');
const smsService = require('../services/sms-service');
const logger = require('./logger')('utils: sendNoticeToOne');
const notificationService = require('../services/notice-center/notice');

module.exports = sendNoticeToOne;