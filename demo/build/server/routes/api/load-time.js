'use strict';

const router = require('express').Router();
const logger = require('../../utils/logger')('industry-service');
const loadTimeService = require('../../services/load-time');
const uaParser = require('ua-parser-js');

module.exports = router;

router.post('/load_time', (req, res) => {
  const uaInfo = uaParser(req.headers['user-agent']);
  const loadTime = req.body.loadTime;
  const browser = uaInfo.browser ? `${uaInfo.browser.name}-${uaInfo.browser.major}` : '';
  const device = uaInfo.device ? `${uaInfo.device.vendor}-${uaInfo.device.model}` : '';
  const os = uaInfo.os ? `${uaInfo.os.name}-${uaInfo.os.version}` : '';
  const params = {
    browser,
    device,
    os,
    loadTime
  };

  loadTimeService.create(params).then(result => {
    res.json(result);
  }).catch(err => {
    res.status(500).send(err);
  });
});

router.post('/ui_error', (req, res) => {
  loadTimeService.createUIError(req.body).then(result => {
    res.json(result);
  }).catch(err => {
    res.status(500).send(err);
  });
});