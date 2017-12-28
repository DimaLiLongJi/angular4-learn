'use strict';

const router = require('express').Router();
const logger = require('../../utils/logger')('opportunity api');
const opportunityService = require('../../services/opportunity-service');

module.exports = router;

router.get('/opportunities', (req, res) => {
  const params = req.query;
  params.type = 0;
  params.status = 2;
  params.noApplyLink = 1;
  if (!params.categoryId) {
    params.categoryIds = [47, 50];
  }
  opportunityService.getOpportunityList(params).then(result => {
    res.json(result);
  }).catch(error => {
    const errorObj = {
      msg: '获取机会列表失败',
      error
    };
    res.status(500).send(errorObj);
    logger.error(errorObj);
  });
});

router.get('/opportunities/customize', (req, res) => {
  const params = req.query;
  if (!params.userId) {
    params.userId = req.user ? req.user.id : null;
  }
  opportunityService.getCustomizedOpportunityList(params).then(result => {
    res.json(result);
  }).catch(error => {
    const errorObj = {
      msg: '获取机会列表失败',
      error
    };
    res.status(500).send(errorObj);
    logger.error(errorObj);
  });
});

router.get('/opportunities/university_tour', (req, res) => {
  const params = req.query;
  params.type = 2;
  params.status = 2;
  params.noApplyLink = 1;

  opportunityService.getOpportunityList(params).then(result => {
    res.json(result);
  }).catch(error => {
    const errorObj = {
      msg: '获取机会列表失败',
      error
    };
    res.status(500).send(errorObj);
    logger.error(errorObj);
  });
});

router.get('/opportunities/count', (req, res) => {
  const params = req.query || {};
  opportunityService.getOpportunityCount(params).then(result => {
    res.json(result);
  }).catch(error => {
    const errorObj = {
      msg: '获取机会总数失败',
      error
    };
    res.status(500).send(errorObj);
    logger.error(errorObj);
  });
});

router.get('/opportunities/statistics/industry', (req, res) => {
  const params = req.query;
  opportunityService.getIndustryStatistics(params).then(result => res.send(result)).catch(error => {
    const errorObj = {
      message: error.message || error
    };
    logger.error('get material industry statistics error: ', errorObj);
    res.status(400).end(errorObj.message);
  });
});

router.get('/opportunities/:id(\\d+)', (req, res) => {
  const params = {
    id: req.params.id
  };
  if (req.user) {
    params.userId = req.user.id;
  }
  return opportunityService.getDetail(params).then(opp => {
    res.send(opp);
  });
});

router.get('/opportunities/location/list', (req, res) => {
  let params = {};
  if (req.query.limit) {
    params = {
      limit: req.query.limit
    };
  }
  opportunityService.getLocationList(params).then(result => {
    res.json(result);
  });
});

router.get('/campus_recruits/companies/statistics', (req, res) => {
  opportunityService.getCompanyStatistics(req.query).then(result => {
    res.json(result);
  }).catch(err => {
    res.status(500).send(err);
  });
});

router.get('/campus_recruits/companies', (req, res) => {
  opportunityService.getRecruitCompanyList(req.query).then(result => {
    res.json(result);
  }).catch(err => {
    res.status(500).send(err);
  });
});

router.get('/campus_recruits/companies/:companyId(\\d+)/opportunities', (req, res) => {
  opportunityService.getCompanyCampusOpportunities(req.params.companyId).then(result => {
    res.json(result);
  }).catch(err => {
    res.status(500).send(err);
  });
});

router.get('/campus_recruits/recommend/:id(\\d+)', (req, res) => {
  opportunityService.getCampusRecruitRecommend(req.params.id).then(result => {
    res.json(result);
  }).catch(err => {
    res.status(500).send(err);
  });
});

router.get('/campus_recruits/countdown_list', (req, res) => {
  opportunityService.getRecruitCountdown(req.query).then(result => {
    res.json(result);
  }).catch(err => {
    res.status(500).send(err);
  });
});