'use strict';

const express = require('express');

const router = express.Router();
const logger = require('../../../utils/logger')('company');
const userSubscriptionService = require('../../../services/user/subscription');

module.exports = router;

router.get('/users/:userId(\\d+)/subscription', (req, res) => {
  userSubscriptionService.getUserSubscription(req.params.userId).then(result => {
    res.json(result);
  }).catch(err => {
    err.message = err.message || '获取用户订阅失败';
    logger.debug('get user attachment list failed, err is', err, 'params is', req.params);
    res.status(500).send(err);
  });
});

router.post('/users/:userId(\\d+)/subscription', (req, res) => {
  userSubscriptionService.create(req.params.userId, req.body).then(result => {
    res.json(result);
  }).catch(err => {
    err.message = err.message || '创建用户订阅失败';
    logger.debug('create user attachment failed, err is', err, 'params is', req.params);
    res.status(500).send(err);
  });
});

router.delete('/users/:userId(\\d+)/subscription', (req, res) => {
  userSubscriptionService.destroy(req.params.userId).then(result => {
    res.json(result);
  }).catch(err => {
    err.message = err.message || '删除用户订阅失败';
    logger.debug('delete user attachment failed, err is', err, 'params is', req.params);
    res.status(500).send(err);
  });
});

router.delete('/users/:userId(\\d+)/subscription/:subscriptionId(\\d+)', (req, res) => {
  const params = {
    userId: req.params.userId,
    subscriptionId: req.params.subscriptionId
  };
  userSubscriptionService.cancel(params).then(result => {
    res.json(result);
  }).catch(err => {
    err.message = err.message || '删除用户订阅失败';
    logger.debug('delete user attachment failed, err is', err, 'params is', req.params);
    res.status(500).send(err);
  });
});