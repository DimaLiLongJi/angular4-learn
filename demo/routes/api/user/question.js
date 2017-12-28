const express = require('express');

const router = express.Router();
const logger = require('../../../utils/logger')('company');
const userQuestionService = require('../../../services/user/question');

module.exports = router;

router.post('/users/:userId(\\d+)/questions', (req, res) => {
  userQuestionService.create(req.params.userId, req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      err.message = err.message || '创建用户问题失败';
      logger.debug('create user questions failed, err is', err, 'params is', req.params);
      res.status(500).send(err);
    });
});


router.get('/users/:userId(\\d+)/questions/checkCount', (req, res) => {
  userQuestionService.checkCount(req.params.userId)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      err.message = err.message || '获取用户当天提问次数';
      logger.debug('get user checkCount failed, err is', err, 'params is', req.params);
      res.status(500).send(err);
    });
});

router.get('/users/questions', (req, res) => {
  const params = req.query;
  params.ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
  params.logKeyword = true;
  userQuestionService.getList(params)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      err.message = err.message || '获取问题列表失败';
      logger.debug('create user attachment failed, err is', err, 'params is', req.params);
      res.status(500).send(err);
    });
});

router.get('/users/:userId(\\d+)/questions', (req, res) => {
  const params = req.query;
  params.userId = req.params.userId;
  userQuestionService.getUserQuestions(params)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      err.message = err.message || 'get question detail failed';
      logger.debug('get question detail failed, err is', err, 'params is', req.params);
      res.status(500).send(err);
    });
});

router.get('/users/:userId(\\d+)/questions/check_read', (req, res) => {
  const params = req.params;
  userQuestionService.checkUserUnread(params)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      err.message = err.message || 'get question detail failed';
      logger.debug('get question detail failed, err is', err, 'params is', req.params);
      res.status(500).send(err);
    });
});

router.get('/users/questions/customize', (req, res) => {
  const params = req.query;
  params.ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
  params.logKeyword = true;
  params.userId = req.user && req.user.id;
  userQuestionService.getCustomizedQuestions(params)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      err.message = err.message || '获取问题列表失败';
      logger.debug('create user attachment failed, err is', err, 'params is', req.params);
      res.status(500).send(err);
    });
});

router.get('/users/questions/:id(\\d+)', (req, res) => {
  const params = {
    questionId: req.params.id,
  };
  if (req.user) {
    params.userId = req.user.id;
  }
  if (!params.questionId) {
    res.status(400).send({
      errorMessage: '参数缺失',
    });
    return;
  }
  userQuestionService.getDetail(params)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      err.message = err.message || 'get question detail failed';
      logger.debug('get question detail failed, err is', err, 'params is', req.params);
      res.status(500).send(err);
    });
});
