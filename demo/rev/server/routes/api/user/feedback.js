'use strict';

const express = require('express');

const router = express.Router();
const logger = require('../../../utils/logger')('feedback');
const userFeedbackService = require('../../../services/user/feedback');

module.exports = router;

router.post('/users/feedback', (req, res) => {
  const params = req.body;
  params.userId = req.user && req.user.id;
  userFeedbackService.postFeedback(params).then(result => {
    res.json(result);
  }).catch(err => {
    err.message = err.message || '提交用户反馈失败';
    logger.debug('post user feedback failed, err is', err, 'params is', req.params);
    res.status(500).send(err);
  });
});