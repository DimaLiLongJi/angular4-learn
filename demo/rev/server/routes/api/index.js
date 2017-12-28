'use strict';

const router = require('express').Router();
const articleRouter = require('./article');
const companyRouter = require('./company');
const bannerRouter = require('./banner');
const activityRouter = require('./activity');
const opportunityRouter = require('./opportunity');
const tagRouter = require('./tag');
const locationTagRouter = require('./location-tag');
const mobilePrefixRouter = require('./mobile-prefix');
const discoveryRouter = require('./discovery');
const userRouter = require('./user');
const wecharRouter = require('./wechat');
const danmuRouter = require('./danmu');
const industryRouter = require('./industry');
const materialRouter = require('./material');
const professionRouter = require('./profession');
const loadTimeRouter = require('./load-time');

module.exports = router;

// pages
router.use('/api', companyRouter, bannerRouter, activityRouter, articleRouter, opportunityRouter, tagRouter, locationTagRouter, mobilePrefixRouter, discoveryRouter, userRouter, wecharRouter, danmuRouter, industryRouter, materialRouter, professionRouter, loadTimeRouter);