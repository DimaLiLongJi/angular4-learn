'use strict';

const router = require('express').Router();
const industryCompanyRouter = require('./company');
const industryIntroRouter = require('./intro');
const industryPositionRouter = require('./position');

module.exports = router;

// pages
router.use('/industry', industryCompanyRouter, industryIntroRouter, industryPositionRouter);