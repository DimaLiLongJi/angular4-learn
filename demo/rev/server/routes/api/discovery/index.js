'use strict';

const router = require('express').Router();
const industryRouter = require('./industry');

module.exports = router;

// pages
router.use('/discovery', industryRouter);