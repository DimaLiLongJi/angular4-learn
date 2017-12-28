const router = require('express').Router();
const baseUrls = require('config').baseUrls;
const articleService = require('../../services/article');
const opportunityService = require('../../services/opportunity-service');
const bannerService = require('../../services/banner');
const companyService = require('../../services/discovery/company');
// const activityService = require('../../services/activity');
const accessLogService = require('../../services/access-log-service');
const moment = require('moment');
const isSpider = require('../../utils/isSpider');
const buildView = require('../../utils/viewBuilder');
const ua = require('../../utils/userAgent');
const questionService = require('../../services/user/question');
const universityTourRouter = require('./university-tour');
const refreshToken = require('../../middlewares/refreshToken');
const logger = require('../../utils/logger')('page-router');
const customizedOppDailyRouter = require('./customized-opp-daily');

module.exports = router;

router.use('/university_tour', universityTourRouter);
router.use('/customized_opp_daily', customizedOppDailyRouter);


// index
router.get(['/', '/auth'], async (req, res) => {
  const agent = ua(req.headers['user-agent']);
  const userAgent = req.headers['user-agent'];

  const params = {
    API_BASE_URL: baseUrls.API_BASE_URL,
    BASE_URL: baseUrls.BASE_URL,
    CF_FILE_BASE_URL: baseUrls.CF_FILE_BASE_URL,
    serviceUrl: `${baseUrls.CF_VISITOR_BASE_URL}/service`,
    cepingUrl: baseUrls.CF_CEPING_BASE_URL,
  };
  if (isSpider(userAgent)) {
    const allOpp = await opportunityService.getOpportunityList({
      getAll: 1,
    });
    buildView(req, res, 'app/pc/index-spider', Object.assign({}, params, { opps: allOpp.opps, }));
    return;
  }
  if (agent.mobile) {
    buildView(req, res, 'app/mobile/index', {
      API_BASE_URL: baseUrls.API_BASE_URL,
      BASE_URL: baseUrls.BASE_URL,
      CF_FILE_BASE_URL: baseUrls.CF_FILE_BASE_URL,
    });
  } else {
    buildView(req, res, 'app/pc/index', params);
  }
});

router.get(/^\/mobile/, refreshToken, async (req, res) => {
  const agent = ua(req.headers['user-agent']);
  if (req.originalUrl.match(/mobile\?/)) {
    let url = req.originalUrl;
    url = url.replace('mobile?', 'mobile/?');
    return res.redirect(url);
  }
  if (agent.mobile) {
    buildView(req, res, 'app/mobile/index', {
      API_BASE_URL: baseUrls.API_BASE_URL,
      BASE_URL: baseUrls.BASE_URL,
      CF_FILE_BASE_URL: baseUrls.CF_FILE_BASE_URL,
      serviceUrl: `${baseUrls.CF_VISITOR_BASE_URL}/service`,
      cepingUrl: baseUrls.CF_CEPING_BASE_URL,
    });
  }
});

// account
router.get('/account', (req, res) => {
  if (!req.user) {
    res.redirect('/');
  }
  buildView(req, res, 'account/pc/index', {
    API_BASE_URL: baseUrls.API_BASE_URL,
    serviceUrl: `${baseUrls.CF_VISITOR_BASE_URL}/service`,
    cepingUrl: baseUrls.CF_CEPING_BASE_URL,
    CF_FILE_BASE_URL: baseUrls.CF_FILE_BASE_URL,
  });
});

router.get('/preview_banner/:bannerId', async (req, res) => {
  const banners = await bannerService.getDetail(req.params.bannerId);
  res.render('app/pc/index', {
    serviceUrl: `${baseUrls.CF_VISITOR_BASE_URL}/service`,
    cepingUrl: baseUrls.CF_CEPING_BASE_URL,
    banners: [banners],
  });
});

// opportunity

router.get('/opportunity/:id(\\d+)', async (req, res) => {
  const emailReg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/g;
  const agent = ua(req.headers['user-agent']);
  const id = req.params.id;
  let oppDetail;
  let emailArray = [];
  if (!id) {
    return res.redirect('/404');
  }
  const oppParams = { id, };
  if (req.user) {
    oppParams.userId = req.user.id;
  }
  try {
    oppDetail = await opportunityService.getDetail(oppParams);
  } catch (e) {
    logger.error('get oppDetail fail id is', id);
  }
  if (!oppDetail) {
    return res.redirect('/404');
  }
  if (oppDetail.description) {
    emailArray = oppDetail.description.match(emailReg);
    oppDetail.description = oppDetail.description.replace(emailReg, '');
    const tempArray = [];
    emailArray = !emailArray ? [] : emailArray;
    emailArray.forEach((email) => {
      if (tempArray.indexOf(email) === -1) {
        tempArray.push(email);
      }
    });
    emailArray = tempArray;
  }
  if (agent.mobile) {
    buildView(req, res, './opportunity/mobile/detail', {
      oppDetail,
      oppId: oppDetail.id,
      opp: oppDetail,
      serviceUrl: `${baseUrls.CF_VISITOR_BASE_URL}/service`,
      cepingUrl: baseUrls.CF_CEPING_BASE_URL,
      baseUrls,
      emailArray: emailArray || [],
    });
  } else {
    buildView(req, res, './opportunity/pc/detail', {
      API_BASE_URL: baseUrls.API_BASE_URL,
      BASE_URL: baseUrls.BASE_URL,
      CF_FILE_BASE_URL: baseUrls.CF_FILE_BASE_URL,
      emailArray,
      oppId: oppDetail.id,
      oppDetail,
      serviceUrl: `${baseUrls.CF_VISITOR_BASE_URL}/service`,
      cepingUrl: baseUrls.CF_CEPING_BASE_URL,
    });
  }
  const isFirstAccess = await accessLogService.isFirstAccess({
    ip: req.headers['x-real-ip'] || req.connection.remoteAddress,
    entityId: id,
  });
  if (!isFirstAccess || isFirstAccess.result === 0) {
    accessLogService.createAccessLog({
      entityId: id,
      type: 'opportunity',
      userId: req.user && req.user.id,
      accessDate: new Date(),
      ip: req.headers['x-real-ip'] || req.connection.remoteAddress,
    });
  }
});
// discovery
router.get('/discovery', (req, res) => {
  // const userAgent = req.headers['user-agent'];
    buildView(req, res, './discovery/pc/list', {
      API_BASE_URL: baseUrls.API_BASE_URL,
      serviceUrl: `${baseUrls.CF_VISITOR_BASE_URL}/service`,
      cepingUrl: baseUrls.CF_CEPING_BASE_URL,
      CF_FILE_BASE_URL: baseUrls.CF_FILE_BASE_URL,
    });
  });

router.get('/company/:id', async (req, res) => {
  const userAgent = req.headers['user-agent'];
  const agent = ua(req.headers['user-agent']);
  const id = req.params.id;

  const company = await companyService.getDetail(id);
  if (!id || !company) {
    res.redirect('/404');
  }
  const similarCompany = await companyService.getSimilarCompanyList(id);
  if (isSpider(userAgent)) {
    const oppObj = await opportunityService.getOpportunityList({
      companyId: id,
      getAll: 1,
    });
    buildView(req, res, './company/pc/detail-spider', {
      opps: oppObj.opps,
      company,
      similarCompany,
      API_BASE_URL: baseUrls.API_BASE_URL,
      BASE_URL: baseUrls.BASE_URL,
      serviceUrl: `${baseUrls.CF_VISITOR_BASE_URL}/service`,
      cepingUrl: baseUrls.CF_CEPING_BASE_URL,
    });
  } else if (agent.mobile) {
      buildView(req, res, './company/mobile/detail', {
        company,
        similarCompany: similarCompany || [],
        API_BASE_URL: baseUrls.API_BASE_URL,
        BASE_URL: baseUrls.BASE_URL,
        serviceUrl: `${baseUrls.CF_VISITOR_BASE_URL}/service`,
        cepingUrl: baseUrls.CF_CEPING_BASE_URL,
      });
    } else {
      buildView(req, res, './company/pc/detail', {
        company,
        similarCompany,
        API_BASE_URL: baseUrls.API_BASE_URL,
        BASE_URL: baseUrls.BASE_URL,
        serviceUrl: `${baseUrls.CF_VISITOR_BASE_URL}/service`,
        cepingUrl: baseUrls.CF_CEPING_BASE_URL,
      });
    }
});

router.get('/recruit_calendar', (req, res) => {
  const userAgent = req.headers['user-agent'];
  const agent = ua(req.headers['user-agent']);
  // if (isSpider(userAgent)) {
  //   buildView('./recruit_calendar/list-spider', {
  //     API_BASE_URL: baseUrls.API_BASE_URL,
  //     serviceUrl: `${baseUrls.CF_VISITOR_BASE_URL}/service`,
  //     cepingUrl: baseUrls.CF_CEPING_BASE_URL,
  //     CF_FILE_BASE_URL: baseUrls.CF_FILE_BASE_URL,
  //   });
  // }
  if (!isSpider(userAgent) && !agent.mobile) {
    buildView(req, res, './recruit_calendar/pc/list', {
      API_BASE_URL: baseUrls.API_BASE_URL,
      BASE_URL: baseUrls.BASE_URL,
      CF_FILE_BASE_URL: baseUrls.CF_FILE_BASE_URL,
    });
  }
});

router.get('/recruit_calendar/upcoming', async (req, res) => {
  const agent = ua(req.headers['user-agent']);
  const oppId = req.query.opportunityId;
  if (!oppId) {
    logger.info('recruit_calendar upcoming get oppId fail params is', req.query);
    return res.redirect('/404');
  }
  const oppParams = { id: oppId, };
  if (req.user) {
    oppParams.userId = req.user.id;
  }
  const oppDetail = await opportunityService.getDetail(oppParams);
  const recruitRecommend = await opportunityService.getCampusRecruitRecommend(oppId);
  if (oppDetail.applyStart) {
    oppDetail.applyStart = moment(oppDetail.applyStart).format('YYYY/MM/DD');
  }
  if (oppDetail.applyEnd) {
    oppDetail.applyEnd = moment(oppDetail.applyEnd).format('YYYY/MM/DD');
  }
  if (recruitRecommend.length) {
    recruitRecommend.forEach((r) => {
      if (r.opportunity.applyStart) {
        r.opportunity.applyStart = moment(r.opportunity.applyStart).format('YYYY/MM/DD');
      }
      if (r.opportunity.applyEnd) {
        r.opportunity.applyEnd = moment(r.opportunity.applyEnd).format('YYYY/MM/DD');
      } else {
        r.opportunity.applyEnd = '待定';
      }
      if (r.introduction) {
        r.text = `${r.introduction.replace(/\n/g, '').replace(/&amp;/g, '&').replace(/&nbsp;/g, '')
        .replace(/\s/g, '')
        .replace(/<\/?[^>]*>/g, '')
        .trim()
        .substr(0, 70)}……`;
      }
    });
  }
  if (agent.mobile) {
    buildView(req, res, './recruit_calendar/mobile/upcoming', {
      API_BASE_URL: baseUrls.API_BASE_URL,
      BASE_URL: baseUrls.BASE_URL,
      recruitRecommend,
      oppDetail,
    });
  } else {
    buildView(req, res, './recruit_calendar/pc/upcoming', {
      API_BASE_URL: baseUrls.API_BASE_URL,
      BASE_URL: baseUrls.BASE_URL,
      recruitRecommend,
      oppDetail,
    });
  }
});

router.get('/resumes/:id/preview', (req, res) => {
  const resume = {
    fileId: Number(req.params.id),
    fileName: req.query.fileName,
  };
  if (!resume.fileId) {
    res.redirect('/404');
    return;
  }
  buildView(req, res, 'resume-preview', {
    resume,
    baseUrls,
  });
});

router.get('/reply-question/:id', async (req, res) => {
  const questionId = req.params.id;
  if (!questionId) {
    res.redirect('/404');
  }

  const detail = await questionService.getDetail({
    questionId,
  });
  buildView(req, res, 'reply-question', {
    detail,
  });
});

router.get('/question', (req, res) => {
  buildView(req, res, 'question/pc/list', {
    API_BASE_URL: baseUrls.API_BASE_URL,
    serviceUrl: `${baseUrls.CF_VISITOR_BASE_URL}/service`,
    cepingUrl: baseUrls.CF_CEPING_BASE_URL,
    CF_FILE_BASE_URL: baseUrls.CF_FILE_BASE_URL,
  });
});

async function getIndexData() {
  const opps = await opportunityService.getListGroupBycategory();
  const companies = await companyService.getRecommendList();
  const articles = await articleService.getListGroupBycategory({
    limit: 4,
  });
  const bannerObj = await bannerService.getList({
    published: 1,
  });
  const oppObj = {};
  const articleObj = {};
  opps.forEach((opp) => {
    opp.opps.forEach((oppDetail) => {
      if (!oppDetail.applyLink) {
        oppDetail.applyLink = `/opportunity/${oppDetail.id}`;
      }
      oppDetail.created_at = moment(oppDetail.created_at).format('YYYY/MM/DD');
    });
    // publish_date = moment(opp.publish_date)
    switch (opp.name) {
      case '日常实习': oppObj.dailyIntern = opp;
        break;
      case '寒暑假实习': oppObj.vacationIntern = opp;
        break;
      case '校招全职': oppObj.campus = opp;
        break;
      case '社招全职': oppObj.socialRecruitment = opp;
        break;
      default:
    }
  });
  articles.forEach((article) => {
    switch (article.name) {
      case '行业': articleObj.industry = article;
        break;
      case '面试': articleObj.interview = article;
        break;
      case '简历': articleObj.resume = article;
        break;
      case '资料': articleObj.material = article;
        break;
      default:
    }
  });
  return {
    oppObj,
    companies,
    articleObj,
    banners: bannerObj.banners,
  };
}

// ios-qr-code
router.get('/ios_qr_code', async (req, res) => {
  buildView(req, res, 'ios-qr-code', {});
});

router.get('/interview_material', (req, res) => {
  buildView(req, res, 'interview_material/pc/view', {
    API_BASE_URL: baseUrls.API_BASE_URL,
    CF_FILE_BASE_URL: baseUrls.CF_FILE_BASE_URL,
  });
});

router.get('/interview_material/:id', (req, res) => {
  buildView(req, res, 'interview_material/pc/industry-view', {
    API_BASE_URL: baseUrls.API_BASE_URL,
    CF_FILE_BASE_URL: baseUrls.CF_FILE_BASE_URL,
  });
});

router.get('/materials/:id/preview', (req, res) => {
  const material = {
    fileId: Number(req.params.id),
    fileName: req.query.fileName,
  };
  if (!material.fileId) {
    res.redirect('/404');
    return;
  }
  buildView(req, res, 'material-preview', {
    material,
    baseUrls,
  });
});
