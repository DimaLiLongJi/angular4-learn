const express = require('express');

const router = express.Router();
const logger = require('../../utils/logger')('company');
const danmuService = require('../../services/danmu-service');
const questionService = require('../../services/user/question');

module.exports = router;

router.get('/danmu', (req, res) => {
  danmuService.getDanmuData(req.query)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      err.message = err.message || '获取danmu失败';
      logger.debug('get danmu list failed, err is', err, 'params is', req.params);
      res.status(500).send(err);
    });
});

router.get('/danmu/customize', (req, res) => {
  if (req.user) {
    req.query.userId = req.user.id;
  }
  danmuService.getCustomizedDanmuData(req.query)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      err.message = err.message || '获取danmu失败';
      logger.debug('get danmu list failed, err is', err, 'params is', req.params);
      res.status(500).send(err);
    });
});

router.get('/danmu/qa', (req, res) => {
  danmuService.getQADanmuData(req.query)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      err.message = err.message || '获取qa danmu失败';
      logger.debug('get qa danmu list failed, err is', err, 'params is', req.params);
      res.status(500).send(err);
    });
});

router.get('/danmu/qa/customize', (req, res) => {
  const userId = req.query.userId || (req.user ? req.user.id : null);
  questionService.getCustomizedQuestions({
      userId,
    })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      err.message = err.message || '获取qa danmu失败';
      logger.debug('get qa danmu list failed, err is', err, 'params is', req.params);
      res.status(500).send(err);
    });
});
