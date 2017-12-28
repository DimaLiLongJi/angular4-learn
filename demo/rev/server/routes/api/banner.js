'use strict';

const express = require('express');

const router = express.Router();
const _ = require('lodash');
const logger = require('../../utils/logger')('company');
const bannerService = require('../../services/banner');

module.exports = router;

router.get('/banners', (req, res) => {
  const params = _.pick(req.query, ['pageNum', 'itemsPerPage', 'published', 'enabled']);
  bannerService.getList(params).then(result => {
    res.json(result);
  }).catch(err => {
    err.message = err.message || '获取banner列表失败';
    logger.debug('get banner list failed, err is', err, 'params is', params);
    res.status(500).send(err);
  });
});