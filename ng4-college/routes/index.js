const router = require('express').Router();
const pageRouter = require('./page/pages');
const apiRouter = require('./api');
const auth = require('../middlewares/auth');
const healthcheck = require('../middlewares/healthcheck');
const goWechatFilter = require('../middlewares/go-wechat-filter');
const buildView = require('../utils/viewBuilder');

module.exports = router;

router.use(healthcheck);

// pages
router.get('/go-wechat', (req, res) => {
  const params = req.query;
  let follow = false;
  if (params.follow) {
    follow = true;
  } else {
    follow = false;
  }
  buildView(req, res, 'go-wechat/go-wechat', {
    follow,
  });
});

router.get('/go-wechat-qa', (req, res) => {
  buildView(req, res, 'go-wechat/go-wechat-qa');
});

router.use('/', auth, goWechatFilter, pageRouter);
router.use('/', auth, apiRouter);
