module.exports = {
  getToken,
  getSubcribeUserInfo,
  createCustomMenu,
  sendSubscribeNotice,
  sendAnswerTemplateNotice,
  getTempQrCodeTicket,
  sendPositionNotice,
};

const wechatConfig = require('config').wechatCollegeAssistant;
const baseUrls = require('config').baseUrls;
const rp = require('request-promise');
const _ = require('lodash');
const rd = require('./redis-service');
const wechatMenu = require('../config/wechatMenu');
const opportunityService = require('./opportunity-service');
const subscriptionService = require('./user/subscription');
const moment = require('moment');
const randomString = require('randomstring');
const subscribeIndustry = require('../config/subcribeIndustry');
const logger = require('../utils/logger')('wechat-service');

const tokenKey = 'COLLEGE_WECHAT_ACCESS_TOKEN';

async function getToken() {
  let t;
  try {
    t = await rd.getAsync(tokenKey);
  } catch (e) {
    console.log('get wechat token from redis failed', e);
  }
  console.log('token from redis is:', t);
  if (t) {
    return t;
  }
  return getAccessToken();
}

async function getAccessToken() {
  const url = `${wechatConfig.API_BASE_URL}token`;
  const qs = {
    grant_type: wechatConfig.grant_type,
    appid: wechatConfig.appID,
    secret: wechatConfig.appsecret,
  };

  const result = await sendRequest('GET', qs, url);
  console.log('get access_token result:', JSON.stringify(result));
  await rd.setAsync(tokenKey, result.access_token, 'EX', result.expires_in - 600);
  return result.access_token;
}

async function getSubcribeUserInfo(openId) {
  const url = `${wechatConfig.API_BASE_URL}user/info`;
  const qs = {
    access_token: await getToken(),
    openid: openId,
  };

  const userInfo = await sendRequest('GET', qs, url);

  userInfo.headImgUrl = userInfo.headimgurl;
  userInfo.openId = userInfo.openid;
  userInfo.gender = userInfo.sex;
  return userInfo;
}

async function getTempQrCodeTicket(params) {
  const url = `https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=${await getToken()}`;
  const randomStr = randomString.generate() + new Date().getTime();
  const utmArr = params.utm || [];
  let lastUtmInfo = {};
  if (utmArr.length) {
    lastUtmInfo = utmArr[utmArr.length - 1];
  }
  const qs = {
    expire_seconds: 3600,
    action_name: 'QR_STR_SCENE',
    action_info: {
      scene: {
        scene_str: `subscribe_${randomStr}||utm_${JSON.stringify(lastUtmInfo)}`,
      },
    },
  };
  const result = await sendRequest('POST', qs, url);

  result.echoStr = randomStr;
  return result;
}

async function sendSubscribeNotice() {
  let success = 0;
  let failure = 0;

  const url = `${wechatConfig.API_BASE_URL}message/template/send?access_token=${await getToken()}`;
  for (const key in subscribeIndustry) {
    const industryId = subscribeIndustry[key].id;
    const resultC = await opportunityService.getRecruitCompanyList({
      publishFrom: moment().subtract(1, 'days').format('YYYY-MM-DD 12:00:00'),
      publishTo: moment().format('YYYY-MM-DD 12:00:00'),
      industryId,
    });
    const users = await subscriptionService.getIndustrySubscription(industryId);
    if (resultC && resultC.totalItems > 0 && users && users.length > 0) {
      const companies = _.sampleSize(resultC.companies, 2);
      for (const company of companies) {
        for (const user of users) {
          if (user.collegeUser) {
            logger.info('subscription user=', user.collegeUser, 'opp=', company.opportunity.id);
            const params = buildTemplateData(company, user);
            try {
              const result = await sendRequest('POST', params, url);
              if (result.errcode === 0) {
                success++;
              } else {
                logger.error('send subscription notice err code is', result.errcode, 'err msg is', result.errmsg);
                failure++;
              }
            } catch (e) {
              logger.error('send subscription notice err=', e, 'user is', user, 'opp is', company.opportunity);
              failure++;
            }
          }
        }
      }
    }
  }
  return {
    success,
    failure,
  };
}

async function sendAnswerTemplateNotice(params) {
  let success = 0;
  let failure = 0;

  const url = `${wechatConfig.API_BASE_URL}message/template/send?access_token=${await getToken()}`;
  const body = buildAnswerTemplateData(params);
  try {
    const result = await sendRequest('POST', body, url);
    if (result.errcode === 0) {
      success++;
    } else {
      logger.error('send answer notice err code is', result.errcode, 'err msg is', result.errmsg);
      failure++;
    }
  } catch (e) {
    logger.error('send answer notice err is', e);
    failure++;
  }
  return {
    success,
    failure,
  };
}

async function createCustomMenu() {
  const url = `${wechatConfig.API_BASE_URL}menu/create?access_token=${await getToken()}`;
  const params = wechatMenu;
  return sendRequest('POST', params, url);
}

function buildTemplateData(company, user) {
  const templateID = wechatConfig.templateID;
  const params = {
    touser: user.collegeUser.openId,
    template_id: templateID,
    url: company.opportunity.applyLink ? company.opportunity.applyLink : `${baseUrls.BASE_URL}/company/${company.id}?campus=1`,
    data: {
      first: {
        value: '【求职学堂】- 校招日历 提醒您以下企业开启校招网申！',
        color: '#173177',
      },
      keyword1: {
        value: company.name,
        color: '#173177',
      },
      keyword2: {
        value: moment(company.opportunity.applyStart).format('YYYY-M-D'),
        color: '#173177',
      },
      remark: {
        value: '回复td取消订阅，pc端访问college.careerfrog.com.cn还可上传自制简历，职位一键投递～',
        color: '#173177',
      },
    },
  };
  return params;
}

function buildAnswerTemplateData(params) {
  const templateID = wechatConfig.answerTemplateID;
  const body = {
    touser: params.user.openId,
    template_id: templateID,
    url: `${baseUrls.BASE_URL}/reply-question/${params.question.id}`,
    data: {
      first: {
        value: '【求职学堂】- 问题回复',
        color: '#173177',
      },
      keyword1: {
        value: params.user.nickname,
        color: '#173177',
      },
      keyword2: {
        value: params.question.title,
        color: '#173177',
      },
      keyword3: {
        value: params.content,
        color: '#173177',
      },
      keywor4: {
        value: '求职学堂小助手',
        color: '#173177',
      },
      remark: {
        value: '查看回答详细信息，请点击链接跳转',
        color: '#173177',
      },
    },
  };
  return body;
}

async function sendRequest(method, params, url) {
  const options = {
    method,
    json: true,
    url,
  };
  if (method.toUpperCase() === 'GET') {
    options.qs = params;
  } else if (method.toUpperCase() === 'POST') {
    options.body = params;
  }
  const result = await rp(options);
  if (result.errcode === 40001) {
    await getToken();
    return rp(options);
  }
  return result;
}

async function sendPositionNotice(datas) {
  let success = 0;
  let failure = 0;
  for (const d of datas) {
    const result = await sendPositionNoticeToOne(d);
    if (result.errcode === 0) {
      success++;
    } else {
      logger.error('send answer notice err code is', result.errcode, 'err msg is', result.errmsg);
      failure++;
    }
  }
}

async function sendPositionNoticeToOne(dataArr) {
  const url = `${wechatConfig.API_BASE_URL}message/template/send?access_token=${await getToken()}`;
  const body = buildPositionPushTemplateData(dataArr);
  try {
    const result = await sendRequest('POST', body, url);
    return result;
  } catch (e) {
    logger.error('send answer notice err is', e);
    return {
      errcode: 404,
    };
  }
}

function buildPositionPushTemplateData(dataArr) {
  const templateID = wechatConfig.templateID;
  const body = {
    touser: dataArr[1],
    template_id: templateID,
    url: `${baseUrls.BASE_URL}/customized_opp_daily?pushDate=${moment().format('YYYY-MM-DD')}&userId=${dataArr[0]}`,
    data: {
      first: {
        value: '【每日实习推送】-根据你填写的定制信息，今日有如下企业开放实习机会。',
        color: '#173177',
      },
      keyword1: {
        value: `${dataArr[2]} 等多家企业。`,
        color: '#173177',
      },
      keyword2: {
        value: `${moment().format('YYYY年MM月DD日')}`,
        color: '#173177',
      },
      remark: {
        value: '点击查看详情',
        color: '#173177',
      },
    },
  };
  return body;
}
