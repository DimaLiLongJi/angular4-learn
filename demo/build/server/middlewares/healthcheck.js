'use strict';

const router = require('express').Router();
const hostname = require('os').hostname();

const env = process.env.NODE_ENV || 'dev';
const version = require('../.version.json').version;

const SERVICE_TAGS = `${env}_${hostname}_${version}`;

router.get('/healthcheck', (req, res) => {
  res.send('ok');
});

module.exports = [(req, res, next) => {
  res.set('SERVICE_TAGS', `${SERVICE_TAGS}`);
  next();
}, router];