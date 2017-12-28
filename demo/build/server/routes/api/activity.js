'use strict';

const express = require('express');

const router = express.Router();
const _ = require('lodash');
const logger = require('../../utils/logger')('activity');
const activityService = require('../../services/activity');

module.exports = router;

router.get('/activities', (req, res) => {
  const params = _.pick(req.query, ['pageNum', 'itemsPerPage', 'published', 'enabled']);
  activityService.getList(params).then(result => {
    res.json(result);
  }).catch(err => {
    err.message = err.message || '获取activity列表失败';
    logger.debug('get banner list failed, err is', err, 'params is', params);
    res.status(500).send(err);
  });
});

router.get('/activities/:id(\\d+)', (req, res) => {
  const params = req.params.id;
  activityService.getDetail(params).then(result => {
    res.json(result);
  }).catch(err => {
    err.message = err.message || '获取activity详细信息失败';
    logger.debug('get banner detail failed, err is', err, 'params is', params);
    res.status(500).send(err);
  });
});