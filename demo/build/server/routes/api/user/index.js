'use strict';

const router = require('express').Router();
const authRouter = require('./auth');
const applicationRouter = require('./application');
const attachmentRouter = require('./attachment');
const subscriptionRouter = require('./subscription');
const feedbackRouter = require('./feedback');
const questionRouter = require('./question');
const customizeRouter = require('./customize');
const favoriteRouter = require('./favorite');
const customizedPushRouter = require('./customized_push');

module.exports = router;

router.use('/', authRouter, applicationRouter, attachmentRouter, subscriptionRouter, feedbackRouter, questionRouter, customizeRouter, favoriteRouter, customizedPushRouter);