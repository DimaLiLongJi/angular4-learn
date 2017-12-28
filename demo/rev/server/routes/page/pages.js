'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const router = require('express').Router();
const baseUrls = require('config').baseUrls;
const articleService = require('../../services/article');
const opportunityService = require('../../services/opportunity-service');
const bannerService = require('../../services/banner');
const companyService = require('../../services/discovery/company');
// const activityService = require('../../services/activity');
const accessLogService = require('../../services/access-log-service');
const moment = require('moment');
const buildView = require('../../utils/viewBuilder');
const ua = require('../../utils/userAgent');
const questionService = require('../../services/user/question');
const universityTourRouter = require('./university-tour');
const refreshToken = require('../../middlewares/refreshToken');
const logger = require('../../utils/logger')('page-router');
const customizedOppDailyRouter = require('./customized-opp-daily');

const reactRouter = require('./react');

module.exports = router;

router.use('/university_tour', universityTourRouter);
router.use('/customized_opp_daily', customizedOppDailyRouter);

// router.get(/^\/pc/, (req, res) => {
//   buildView(req, res, 'index_v2', {});
// });

router.use(/^\/pc/, reactRouter);

// index
router.get(['/', '/auth'], (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    const agent = ua(req.headers['user-agent']);
    if (agent.mobile) {
      buildView(req, res, 'app/mobile/index', {
        API_BASE_URL: baseUrls.API_BASE_URL,
        BASE_URL: baseUrls.BASE_URL,
        CF_FILE_BASE_URL: baseUrls.CF_FILE_BASE_URL
      });
    } else {
      res.redirect('/pc');
    }
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})());

router.get(/^\/mobile/, refreshToken, (() => {
  var _ref2 = _asyncToGenerator(function* (req, res) {
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
        cepingUrl: baseUrls.CF_CEPING_BASE_URL
      });
    }
  });

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})());

// redirects
router.get(['/account', '/discovery', '/recruit_calendar', '/interview_material'], (req, res) => res.redirect(`/pc${req.originalUrl}`));

router.get('/preview_banner/:bannerId', (() => {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    const banners = yield bannerService.getDetail(req.params.bannerId);
    res.render('app/pc/index', {
      serviceUrl: `${baseUrls.CF_VISITOR_BASE_URL}/service`,
      cepingUrl: baseUrls.CF_CEPING_BASE_URL,
      banners: [banners]
    });
  });

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
})());

// opportunity

router.get('/opportunity/:id(\\d+)', (() => {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    const agent = ua(req.headers['user-agent']);
    if (agent.mobile) {
      const emailReg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/g;
      const id = req.params.id;
      let oppDetail;
      let emailArray = [];
      if (!id) {
        return res.redirect('/404');
      }
      const oppParams = { id };
      if (req.user) {
        oppParams.userId = req.user.id;
      }
      try {
        oppDetail = yield opportunityService.getDetail(oppParams);
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
        emailArray.forEach(function (email) {
          if (tempArray.indexOf(email) === -1) {
            tempArray.push(email);
          }
        });
        emailArray = tempArray;
      }

      buildView(req, res, './opportunity/mobile/detail', {
        oppDetail,
        oppId: oppDetail.id,
        opp: oppDetail,
        serviceUrl: `${baseUrls.CF_VISITOR_BASE_URL}/service`,
        cepingUrl: baseUrls.CF_CEPING_BASE_URL,
        baseUrls,
        emailArray: emailArray || []
      });
      const isFirstAccess = yield accessLogService.isFirstAccess({
        ip: req.headers['x-real-ip'] || req.connection.remoteAddress,
        entityId: id
      });
      if (!isFirstAccess || isFirstAccess.result === 0) {
        accessLogService.createAccessLog({
          entityId: id,
          type: 'opportunity',
          userId: req.user && req.user.id,
          accessDate: new Date(),
          ip: req.headers['x-real-ip'] || req.connection.remoteAddress
        });
      }
    } else {
      res.redirect(`/pc/opportunity_detail/${req.params.id}`);
    }
  });

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
})());

router.get('/company/:id', (() => {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    const agent = ua(req.headers['user-agent']);
    const id = req.params.id;

    const company = yield companyService.getDetail(id);
    if (!id || !company) {
      res.redirect('/404');
    }
    const similarCompany = yield companyService.getSimilarCompanyList(id);
    if (agent.mobile) {
      buildView(req, res, './company/mobile/detail', {
        company,
        similarCompany: similarCompany || [],
        API_BASE_URL: baseUrls.API_BASE_URL,
        BASE_URL: baseUrls.BASE_URL,
        serviceUrl: `${baseUrls.CF_VISITOR_BASE_URL}/service`,
        cepingUrl: baseUrls.CF_CEPING_BASE_URL
      });
    } else {
      res.redirect(`/pc${req.originalUrl}`);
    }
  });

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
})());

router.get('/recruit_calendar/upcoming', (() => {
  var _ref6 = _asyncToGenerator(function* (req, res) {
    const agent = ua(req.headers['user-agent']);
    if (agent.mobile) {
      const oppId = req.query.opportunityId;
      if (!oppId) {
        logger.info('recruit_calendar upcoming get oppId fail params is', req.query);
        return res.redirect('/404');
      }
      const oppParams = { id: oppId };
      if (req.user) {
        oppParams.userId = req.user.id;
      }
      const oppDetail = yield opportunityService.getDetail(oppParams);
      const recruitRecommend = yield opportunityService.getCampusRecruitRecommend(oppId);
      if (oppDetail.applyStart) {
        oppDetail.applyStart = moment(oppDetail.applyStart).format('YYYY/MM/DD');
      }
      if (oppDetail.applyEnd) {
        oppDetail.applyEnd = moment(oppDetail.applyEnd).format('YYYY/MM/DD');
      }
      if (recruitRecommend.length) {
        recruitRecommend.forEach(function (r) {
          if (r.opportunity.applyStart) {
            r.opportunity.applyStart = moment(r.opportunity.applyStart).format('YYYY/MM/DD');
          }
          if (r.opportunity.applyEnd) {
            r.opportunity.applyEnd = moment(r.opportunity.applyEnd).format('YYYY/MM/DD');
          } else {
            r.opportunity.applyEnd = '待定';
          }
          if (r.introduction) {
            r.text = `${r.introduction.replace(/\n/g, '').replace(/&amp;/g, '&').replace(/&nbsp;/g, '').replace(/\s/g, '').replace(/<\/?[^>]*>/g, '').trim().substr(0, 70)}……`;
          }
        });
      }
      buildView(req, res, './recruit_calendar/mobile/upcoming', {
        API_BASE_URL: baseUrls.API_BASE_URL,
        BASE_URL: baseUrls.BASE_URL,
        recruitRecommend,
        oppDetail
      });
    } else {
      res.redirect('/pc/recruit_calendar');
    }
  });

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
})());

router.get('/resumes/:id/preview', (req, res) => {
  const resume = {
    fileId: Number(req.params.id),
    fileName: req.query.fileName
  };
  if (!resume.fileId) {
    res.redirect('/404');
    return;
  }
  buildView(req, res, 'resume-preview', {
    resume,
    baseUrls
  });
});

router.get('/reply-question/:id', (() => {
  var _ref7 = _asyncToGenerator(function* (req, res) {
    const questionId = req.params.id;
    if (!questionId) {
      res.redirect('/404');
    }

    const detail = yield questionService.getDetail({
      questionId
    });
    buildView(req, res, 'reply-question', {
      detail
    });
  });

  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
})());

router.get('/question', (req, res) => {
  buildView(req, res, 'question/pc/list', {
    API_BASE_URL: baseUrls.API_BASE_URL,
    serviceUrl: `${baseUrls.CF_VISITOR_BASE_URL}/service`,
    cepingUrl: baseUrls.CF_CEPING_BASE_URL,
    CF_FILE_BASE_URL: baseUrls.CF_FILE_BASE_URL
  });
});

// ios-qr-code
router.get('/ios_qr_code', (() => {
  var _ref8 = _asyncToGenerator(function* (req, res) {
    buildView(req, res, 'ios-qr-code', {});
  });

  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
})());

router.get('/interview_material/:id', (req, res) => {
  buildView(req, res, 'interview_material/pc/industry-view', {
    API_BASE_URL: baseUrls.API_BASE_URL,
    CF_FILE_BASE_URL: baseUrls.CF_FILE_BASE_URL
  });
});

router.get('/materials/:id/preview', (req, res) => {
  const material = {
    fileId: Number(req.params.id),
    fileName: req.query.fileName
  };
  if (!material.fileId) {
    res.redirect('/404');
    return;
  }
  buildView(req, res, 'material-preview', {
    material,
    baseUrls
  });
});

// subscriptions
router.get('/subscriptions', (req, res) => {
  buildView(req, res, 'mobile-subscription', {
    API_BASE_URL: baseUrls.API_BASE_URL
  });
});