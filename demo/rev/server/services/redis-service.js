'use strict';

const config = require('config');
const redis = require('redis');
const bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const rd = redis.createClient(config.redis);

module.exports = rd;

rd.on('connect', () => {
  console.debug('redis server connected');
});

rd.on('error', err => {
  console.error(err);
  rd.quit();
  console.error('redis client connection failed');
});