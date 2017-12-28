'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCountdownList = exports.updateKeyword = exports.getStatistics = exports.getCompanyList = exports.RECALD_GET_COUNTDOWN_LIST = exports.RECALD_KEYWORD_UPDATE = exports.RECALD_GET_STATISTICS = exports.RECALD_GET_COMPANY_LIST = undefined;

require('isomorphic-fetch');

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _req = require('./req');

var _req2 = _interopRequireDefault(_req);

var _axios = require('../utils/axios');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RECALD_GET_COMPANY_LIST = exports.RECALD_GET_COMPANY_LIST = 'RECALD_GET_COMPANY_LIST';
var RECALD_GET_STATISTICS = exports.RECALD_GET_STATISTICS = 'RECALD_GET_STATISTICS';
var RECALD_KEYWORD_UPDATE = exports.RECALD_KEYWORD_UPDATE = 'RECALD_KEYWORD_UPDATE';
var RECALD_GET_COUNTDOWN_LIST = exports.RECALD_GET_COUNTDOWN_LIST = 'RECALD_GET_COUNTDOWN_LIST';

function _getCompanyList(params) {
  return (0, _axios.get)('/api/campus_recruits/companies?' + _qs2.default.stringify(params));
}

var getCompanyList = exports.getCompanyList = (0, _req2.default)(_getCompanyList, RECALD_GET_COMPANY_LIST);

function _getStatistics(params) {
  return fetch('/api/campus_recruits/companies/statistics?' + _qs2.default.stringify(params), {
    credentials: 'include'
  });
}

var getStatistics = exports.getStatistics = (0, _req2.default)(_getStatistics, RECALD_GET_STATISTICS);

var updateKeyword = exports.updateKeyword = function updateKeyword(keyword) {
  return {
    type: RECALD_KEYWORD_UPDATE,
    keyword: keyword
  };
};

function _getCountdownList(params) {
  return (0, _axios.get)('/api/campus_recruits/countdown_list?' + _qs2.default.stringify(params));
}

var getCountdownList = exports.getCountdownList = (0, _req2.default)(_getCountdownList, RECALD_GET_COUNTDOWN_LIST);