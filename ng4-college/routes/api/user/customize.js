const express = require('express');

const router = express.Router();
const logger = require('../../../utils/logger')('feedback');
const userCustomizeService = require('../../../services/user/customize');
const wechatService = require('../../../services/wechat');
const userService = require('../../../services/user/auth');

module.exports = router;

router.put('/users/accept_push', (req, res) => {
  const params = {
    acceptPush: req.body.acceptPush
  };
  params.userId = req.user && req.user.id;
  params.openId = req.user && req.user.openId;
  userService.updateUserInfo(params)
    .then(() => res.json({
      result: 1
    }))
    .catch((err) => {
      err.message = err.message || '更新用户接收推送失败';
      logger.debug('post user customization failed, err is', err, 'params is', req.params);
      res.status(500).send(err);
    });
});

router.post('/users/customize', (req, res) => {
  const params = req.body;
  params.userId = req.user && req.user.id;
  userCustomizeService.customizeUserInfo(params)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      err.message = err.message || '提交用户定制失败';
      logger.debug('post user customization failed, err is', err, 'params is', req.params);
      res.status(500).send(err);
    });
});

router.get('/users/customized_push_daily', async (req, res) => {
  const data = await userCustomizeService.getDailyPushData();
  console.log('datadatadata', JSON.stringify(data));
  wechatService.sendPositionNotice(data)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      err.message = err.message || '职位推送发送失败';
      logger.debug('send customized_daily_push failed, err is', err, 'params is', req.params);
      res.status(500).send(err);
    });
});

router.get('/users/:userId/customize', (req, res) => {
  userCustomizeService.getCustomizeInfo(req.params.userId)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      err.message = err.message || '获取用户定制失败';
      logger.debug('get user customization failed, err is', err, 'params is', req.params);
      res.status(500).send(err);
    });
});
