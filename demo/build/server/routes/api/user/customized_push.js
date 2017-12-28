'use strict';

const express = require('express');
const customizedPushService = require('../../../services/user/customized_push');

const router = express.Router();

module.exports = router;

router.get('/customized_push', (req, res) => {
  const params = req.query;
  params.userId = req.user.id;
  customizedPushService.getListCustomizedPushByDate(params).then(result => {
    console.log('CustomizedPush', result);
    res.json(result);
  });
});