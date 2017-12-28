'use strict';

const express = require('express');

const router = express.Router();
const logger = require('../../../utils/logger')('feedback');
const userFavoriteService = require('../../../services/user/favorite');

module.exports = router;

router.post('/users/favorite', (req, res) => {
  const params = req.body;
  params.userId = req.user && req.user.id;
  userFavoriteService.createUserFavorite(params).then(result => {
    res.json(result);
  }).catch(err => {
    err.message = err.message || '提交用户定制失败';
    logger.debug('post user customization failed, err is', err, 'params is', req.params);
    res.status(500).send(err);
  });
});

router.get('/users/:userId(\\d+)/favorite', (req, res) => {
  const params = req.query;
  params.userId = req.params.userId;
  userFavoriteService.getUserFavorites(params).then(result => {
    res.json(result);
  }).catch(err => {
    err.message = err.message || '提交用户定制失败';
    logger.debug('post user customization failed, err is', err, 'params is', req.params);
    res.status(500).send(err);
  });
});

router.delete('/users/favorite', (req, res) => {
  userFavoriteService.cancelUserFavorites(req.query).then(result => {
    res.json(result);
  }).catch(err => {
    err.message = err.message || '获取用户定制失败';
    logger.debug('get user customization failed, err is', err, 'params is', req.params);
    res.status(500).send(err);
  });
});