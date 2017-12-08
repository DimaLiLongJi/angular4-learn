const express = require('express');

const router = express.Router();
const logger = require('../../../utils/logger')('application');
const userApplicationService = require('../../../services/user/application');

module.exports = router;

router.get('/users/:userId(\\d+)/applications/latest', (req, res) => {
  userApplicationService.getUserLastApplication(req.params.userId)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      err.message = err.message || '获取最新用户申请记录失败';
      logger.debug('get user latest application failed, err is', err, 'params is', req.params);
      res.status(500).send(err);
    });
});

router.post('/users/:userId(\\d+)/applications', (req, res) => {
  logger.info('user id is', req.params.userId, 'apply params is', req.body);
  userApplicationService.create(req.params.userId, req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      err.message = err.message || '创建用户申请记录失败';
      logger.debug('create user application failed, err is', err, 'params is', req.params);
      res.status(500).send(err);
    });
});

router.get('/users/:userId(\\d+)/applications', (req, res) => {
  userApplicationService.getUserApplicationList(req.params.userId, req.query)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      err.message = err.message || '获取用户申请记录失败';
      logger.debug('create user application failed, err is', err, 'params is', req.params);
      res.status(500).send(err);
    });
});

router.get('/users/:userId(\\d+)/applications/:opportunityId/available', (req, res) => {
  userApplicationService.checkApplyAvailable(req.params)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      err.message = err.message || '检查用户申请记录失败';
      logger.debug('create user application failed, err is', err, 'params is', req.params);
      res.status(500).send(err);
    });
});
