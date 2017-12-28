'use strict';

const xml2json = require('xml2json');

module.exports = function parseXml(req, res, next) {
  let json = {};
  req.rawBody = {};
  req.setEncoding('utf8');
  req.on('data', chunk => {
    req.rawBody += chunk;
  });
  req.on('end', () => {
    try {
      req.rawBody = req.rawBody.split('[object Object]')[1];
      json = JSON.parse(xml2json.toJson(req.rawBody));
      req.body = json;
      next();
    } catch (e) {
      next(e);
    }
  });
};