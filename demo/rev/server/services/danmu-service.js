'use strict';

let getDanmuData = (() => {
  var _ref = _asyncToGenerator(function* (params) {
    const questions = yield userQuestionService.getPublishedOrUserQuestions(params);
    const oppQuery = {
      getAll: 1,
      applyStart: moment().format('YYYY-MM'),
      applyStatus: 2
    };
    const opportunities = yield opportunityService.getRecruitCompanyList(oppQuery);
    return { questions, companies: opportunities.companies };
  });

  return function getDanmuData(_x) {
    return _ref.apply(this, arguments);
  };
})();

let getQADanmuData = (() => {
  var _ref2 = _asyncToGenerator(function* (params) {
    const questions = yield userQuestionService.getPublishedOrUserQuestions(params);
    return { questions };
  });

  return function getQADanmuData(_x2) {
    return _ref2.apply(this, arguments);
  };
})();

let getCustomizedDanmuData = (() => {
  var _ref3 = _asyncToGenerator(function* (params) {
    const question = yield userQuestionService.getCustomizedQuestions(params);
    const oppParams = {
      categoryId: 48,
      userId: params.userId,
      customizeDanmu: 1
    };
    const opportunity = yield opportunityService.getCustomizedOpportunityList(oppParams);
    const opps = opportunity.opps.map(function (o) {
      const tempOpp = {
        id: o.company.id,
        name: o.company.name,
        opportunity: {
          id: o.id,
          position: o.position,
          applyStart: o.applyStart
        }
      };
      return tempOpp;
    });
    return {
      questions: {
        publishedQuestions: question.questions
      },
      companies: opps
    };
  });

  return function getCustomizedDanmuData(_x3) {
    return _ref3.apply(this, arguments);
  };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const userQuestionService = require('./user/question');
const opportunityService = require('./opportunity-service');
const moment = require('moment');

module.exports = {
  getDanmuData,
  getQADanmuData,
  getCustomizedDanmuData
};