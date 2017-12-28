'use strict';

const express = require('express');

const router = express.Router();
const logger = require('../../../utils/logger')('company');
const userAttachmentService = require('../../../services/user/attachment');

module.exports = router;

router.get('/users/:userId(\\d+)/attachments', (req, res) => {
  userAttachmentService.getUserAttachments(req.params.userId).then(result => {
    res.json(result);
  }).catch(err => {
    err.message = err.message || '获取用户附件失败';
    logger.debug('get user attachment list failed, err is', err, 'params is', req.params);
    res.status(500).send(err);
  });
});

router.post('/users/:userId(\\d+)/attachments', (req, res) => {
  userAttachmentService.create(req.params.userId, req.body).then(result => {
    res.json(result);
  }).catch(err => {
    err.message = err.message || '创建用户附件失败';
    logger.debug('create user attachment failed, err is', err, 'params is', req.params);
    res.status(500).send(err);
  });
});

router.delete('/users/:userId(\\d+)/attachments/:attachmentId(\\d+)', (req, res) => {
  userAttachmentService.destroy(req.params.userId, req.params.attachmentId).then(result => {
    res.json(result);
  }).catch(err => {
    err.message = err.message || '删除用户附件失败';
    logger.debug('delete user attachment failed, err is', err, 'params is', req.params);
    res.status(500).send(err);
  });
});