'use strict';

const express = require('express');

const router = express.Router();
const _ = require('lodash');
const logger = require('../../utils/logger')('company');
const companyService = require('../../services/discovery/company');

module.exports = router;

router.get('/companies', (req, res) => {
  const params = _.pick(req.query, ['pageNum', 'itemsPerPage', 'isRecommended', 'industryId', 'keyword']);
  companyService.getList(params).then(result => {
    res.json(result);
  }).catch(err => {
    err.message = err.message || '获取公司列表失败';
    logger.debug('get company list failed, err is', err, 'params is', params);
    res.status(500).send(err);
  });
});

router.get('/companies/:companyId(\\d+)', (req, res) => {
  const id = req.params.companyId;
  companyService.getDetail(id, req.query).then(result => {
    res.json(result);
  }).catch(err => {
    err.message = err.message || '获取公司详细信息失败';
    logger.debug('get company detail failed, err is', err, 'params is', params);
    res.status(500).send(err);
  });
});

router.get('/recommend_companies', (req, res) => {
  companyService.getRecommendList().then(result => {
    res.json(result);
  }).catch(err => {
    err.message = err.message || '获取推荐公司信息失败';
    logger.debug('get recommend company failed, err is', err);
    res.status(500).send(err);
  });
});

router.get('/companies/university_tour', (req, res) => {
  companyService.getUTCompanyList().then(result => {
    res.json(result);
  }).catch(err => {
    err.message = err.message || '获取UT公司信息失败';
    logger.debug('get university tour company failed, err is', err);
    res.status(500).send(err);
  });
});

router.get('/similar_companies/:companyId(\\d+)', (req, res) => {
  companyService.getSimilarList(req.params.companyId).then(result => {
    res.json(result);
  }).catch(err => {
    err.message = err.message || '获取推荐公司信息失败';
    logger.debug('get recommend company failed, err is', err);
    res.status(500).send(err);
  });
});

router.get('/companies/:companyId(\\d+)/university_tour', (req, res) => {
  companyService.getDetail(req.params.companyId, { getUTOpp: 1 }).then(result => {
    if (result.Opportunities) {
      result.opportunities = result.Opportunities;
    }
    res.json(result);
  }).catch(err => {
    err.message = err.message || '获取UT公司详情失败';
    logger.debug('get university tour company detail failed, err is', err);
    res.status(500).send(err);
  });
});