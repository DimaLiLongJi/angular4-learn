'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const baseUrls = require('config').baseUrls;

const constants = exports.constants = {
  API_BASE_URL: baseUrls.API_BASE_URL,
  BASE_URL: baseUrls.BASE_URL,
  CF_FILE_BASE_URL: baseUrls.CF_FILE_BASE_URL,
  serviceUrl: `${baseUrls.CF_VISITOR_BASE_URL}/service`,
  cepingUrl: baseUrls.CF_CEPING_BASE_URL
};

const Constants = exports.Constants = store => {
  store.dispatch({
    type: 'CONFIG_LOAD',
    config: constants
  });
};

const UseMiddlewares = exports.UseMiddlewares = (store, ...middlewares) => {
  middlewares.forEach(fn => fn(store));
};