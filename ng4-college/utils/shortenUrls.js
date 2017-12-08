
const rp = require('request-promise');
const logger = require('./logger')('util-shortenUrls');
const weiboAppKey = require('config').weibo.AppKey;

module.exports = shortenUrls;

// test();

function shortenUrls(urls) {
  let reqUri = `http://api.t.sina.com.cn/short_url/shorten.json?source=${weiboAppKey}&`;
  for (const url of urls) {
    if (url.length > 1024) {
      logger.error('url length exceeds limit', {
        url,
      });
      continue;
    }
    reqUri += `&url_long=${url}`;
  }
  const options = {
    uri: reqUri,
    method: 'get',
    json: true,
  };
  return rp(options);
}
