const userQuestionService = require('./user/question');
const opportunityService = require('./opportunity-service');
const moment = require('moment');

module.exports = {
  getDanmuData,
  getQADanmuData,
  getCustomizedDanmuData,
};

async function getDanmuData(params) {
  const questions = await userQuestionService.getPublishedOrUserQuestions(params);
  const oppQuery = {
    getAll: 1,
    applyStart: moment().format('YYYY-MM'),
    applyStatus: 2,
  };
  const opportunities = await opportunityService.getRecruitCompanyList(oppQuery);
  return { questions, companies: opportunities.companies, };
}

async function getQADanmuData(params) {
  const questions = await userQuestionService.getPublishedOrUserQuestions(params);
  return { questions, };
}

async function getCustomizedDanmuData(params) {
  const question = await userQuestionService.getCustomizedQuestions(params);
  const oppParams = {
    categoryId: 48,
    userId: params.userId,
    customizeDanmu: 1,
  };
  const opportunity = await opportunityService.getCustomizedOpportunityList(oppParams);
  const opps = opportunity.opps.map((o) => {
    const tempOpp = {
      id: o.company.id,
      name: o.company.name,
      opportunity: {
        id: o.id,
        position: o.position,
        applyStart: o.applyStart,
      },
    };
    return tempOpp;
  });
  return {
    questions: {
      publishedQuestions: question.questions,
    },
    companies: opps,
  };
}
