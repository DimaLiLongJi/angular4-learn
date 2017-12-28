const router = require('express').Router();
const baseUrls = require('config').baseUrls;
const moment = require('moment');
const companyService = require('../../services/discovery/company');
const accessLogService = require('../../services/access-log-service');
const opportunityService = require('../../services/opportunity-service');
const buildView = require('../../utils/viewBuilder');
const ua = require('../../utils/userAgent');

module.exports = router;

router.get('/', async (req, res) => {
  const agent = ua(req.headers['user-agent']);
  if (agent.mobile) {
    buildView(req, res, './university-tour/mobile/homepage', {
      API_BASE_URL: baseUrls.API_BASE_URL,
      BASE_URL: baseUrls.BASE_URL,
    });
  } else {
    buildView(req, res, './university-tour/pc/homepage', {
      API_BASE_URL: baseUrls.API_BASE_URL,
      BASE_URL: baseUrls.BASE_URL,
    });
  }
});

router.get('/idp', async (req, res) => {
  const agent = ua(req.headers['user-agent']);
  if (agent.mobile) {
    buildView(req, res, './university-tour/mobile/homepage-IDP', {
      API_BASE_URL: baseUrls.API_BASE_URL,
      BASE_URL: baseUrls.BASE_URL,
    });
  } else {
    buildView(req, res, './university-tour/pc/homepage-IDP', {
      API_BASE_URL: baseUrls.API_BASE_URL,
      BASE_URL: baseUrls.BASE_URL,
    });
  }
});

router.get('/company/:id', async (req, res) => {
  const agent = ua(req.headers['user-agent']);
  const id = req.params.id;
  if (!id) {
    res.redirect('/404');
  }
  const company = await companyService.getDetail(id);
  const similarCompany = await companyService.getSimilarCompanyList(id);
  if (agent.mobile) {
    buildView(req, res, './university-tour/mobile/company', {
      company,
      similarCompany: similarCompany || [],
      API_BASE_URL: baseUrls.API_BASE_URL,
      serviceUrl: `${baseUrls.CF_VISITOR_BASE_URL}/service`,
      cepingUrl: baseUrls.CF_CEPING_BASE_URL,
    });
  } else {
    buildView(req, res, './university-tour/pc/company', {
      company,
      similarCompany,
      API_BASE_URL: baseUrls.API_BASE_URL,
      serviceUrl: `${baseUrls.CF_VISITOR_BASE_URL}/service`,
      cepingUrl: baseUrls.CF_CEPING_BASE_URL,
    });
  }
});

router.get('/opportunity/:id', async (req, res) => {
  const emailReg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/g;
  const agent = ua(req.headers['user-agent']);
  const id = req.params.id;
  let oppDetail;
  let emailArray = [];
  if (!id) {
    return res.redirect('/404');
  }
  try {
    const oppParams = { id, };
    if (req.user) {
      oppParams.userId = req.user.id;
    }
    oppDetail = await opportunityService.getDetail(oppParams);
    if (!oppDetail) {
      return res.redirect('/404');
    }
    if (oppDetail.company && oppDetail.company.id) {
      oppDetail.companyDetail = await companyService.getDetail(oppDetail.company.id);
    }
    if (!oppDetail.companyDetail.averageSalary) {
      oppDetail.companyDetail.averageSalary = '暂无';
    }
    if (oppDetail.locations && oppDetail.locations.length > 0) {
      oppDetail.locationText = oppDetail.locations.map(l => l.name).join('、');
    }
    oppDetail.publishDate = moment(oppDetail.publishDate).format('YYYY-MM-DD');
    if (oppDetail.applyStart) {
      oppDetail.applyStart = moment(oppDetail.applyStart).format('MM-DD');
    }

  } catch (e) {
    console.log(e);
  }
  if (oppDetail.description) {
    emailArray = oppDetail.description.match(emailReg);
    oppDetail.description = oppDetail.description.replace(emailReg, '');
    oppDetail.description = oppDetail.description.replace(/\W投递邮箱(:|：)/g, '');
    oppDetail.description = oppDetail.description.replace(/邮件标题及简历请命名为：CF内推-投递企业及岗位名称-姓名-学校-联系方式/g, '');
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
    buildView(req, res, './university-tour/mobile/opportunity', {
      oppDetail,
      oppId: oppDetail.id,
      opp: oppDetail,
      serviceUrl: `${baseUrls.CF_VISITOR_BASE_URL}/service`,
      cepingUrl: baseUrls.CF_CEPING_BASE_URL,
      baseUrls,
      emailArray: emailArray || [],
    });
  } else {
    buildView(req, res, './university-tour/pc/opportunity', {
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

router.get('/go-wechat', (req, res) => {
  buildView(req, res, './university-tour/mobile/go-wechat', {});
});

router.get('/apply', (req, res) => {
  const target = req.query.target;
  if (target) {
    res.redirect('https://jinshuju.net/f/H2n0ei');
  } else {
    res.redirect('https://jinshuju.net/f/yo1yLB?wechat');
  }
});
