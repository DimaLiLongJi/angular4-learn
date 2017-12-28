const cfAdminService = require('../cf-admin-service');
const favoriteService = require('./favorite');

module.exports = {
  getPublishedOrUserQuestions,
  create,
  checkCount,
  getDetail,
  getList,
  getCustomizedQuestions,
  getUserQuestions,
  checkUserUnread,
};

function getPublishedOrUserQuestions(params) {
  const requestOption = {
    method: 'GET',
    uri: 'college/users/questions/published',
    qs: params,
    json: true,
  };
  return cfAdminService.execRpWithOptions(requestOption);
}

function getList(params) {
  params.published = 1;
  const requestOption = {
    method: 'GET',
    uri: params.all ? 'college/users/questions' : 'college/users/questions/random',
    qs: params,
    json: true,
  };
  return cfAdminService.execRpWithOptions(requestOption);
}

async function getDetail(params) {
  const requestOption = {
    method: 'GET',
    uri: `college/users/questions/${params.questionId}`,
    json: true,
    qs: params,
  };
  const question = await cfAdminService.execRpWithOptions(requestOption);
  if (params.userId) {
    const checkResult = await favoriteService.checkUserFavorite({
      type: 'question',
      userId: params.userId,
      entityId: params.questionId,
    });
    console.log('checkResult', checkResult);
    question.isFavorite = checkResult.isFavorite;
  }
  return question;
}

function create(userId, params) {
  params.entityType = 'college_user';
  const requestOption = {
    method: 'post',
    body: params,
    uri: `college/users/${userId}/questions`,
    json: true,
  };
  return cfAdminService.execRpWithOptions(requestOption);
}

function getCustomizedQuestions(params) {
  const requestOption = {
    method: 'GET',
    uri: `college/users/${params.userId}/questions/customize`,
    qs: params,
    json: true,
  };
  return cfAdminService.execRpWithOptions(requestOption);
}

function getUserQuestions(params) {
  const requestOption = {
    method: 'GET',
    uri: `college/users/${params.userId}/questions`,
    qs: params,
    json: true,
  };
  return cfAdminService.execRpWithOptions(requestOption);
}

function checkUserUnread(params) {
  const requestOption = {
    method: 'GET',
    uri: `college/users/${params.userId}/answers/check_read`,
    json: true,
  };
  return cfAdminService.execRpWithOptions(requestOption);
}

function checkCount(userId) {
  const requestOption = {
    method: 'get',
    uri: `college/users/${userId}/questions/check`,
    json: true,
  };
  return cfAdminService.execRpWithOptions(requestOption);
}
