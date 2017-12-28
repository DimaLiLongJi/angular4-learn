'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIndustryCompanyList = exports.getIndustryPosition = exports.getIndustryIntro = exports.DISCV_SELECT_INDUSTRY = exports.DISCV_GET_INDUSTRY_COMPANY = exports.DISCV_GET_INDUSTRY_POSITION = exports.DISCV_GET_INDUSTRY_OPP = exports.DISCV_GET_INDUSTRY_INTRO = undefined;
exports.selectIndustry = selectIndustry;

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _req = require('./req');

var _req2 = _interopRequireDefault(_req);

var _axios = require('../utils/axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DISCV_GET_INDUSTRY_INTRO = exports.DISCV_GET_INDUSTRY_INTRO = 'DISCV_GET_INDUSTRY_INTRO';
var DISCV_GET_INDUSTRY_OPP = exports.DISCV_GET_INDUSTRY_OPP = 'DISCV_GET_INDUSTRY_OPP';
var DISCV_GET_INDUSTRY_POSITION = exports.DISCV_GET_INDUSTRY_POSITION = 'DISCV_GET_INDUSTRY_POSITION';
var DISCV_GET_INDUSTRY_COMPANY = exports.DISCV_GET_INDUSTRY_COMPANY = 'DISCV_GET_INDUSTRY_COMPANY';
var DISCV_SELECT_INDUSTRY = exports.DISCV_SELECT_INDUSTRY = 'DISCV_SELECT_INDUSTRY';

function selectIndustry(params) {
  return {
    type: DISCV_SELECT_INDUSTRY,
    params: params
  };
}

function _getIndustryIntro(params) {
  return _axios2.default.get('/api/discovery/industry/intro?' + _qs2.default.stringify(params), {
    credentials: 'include'
  });
}

var getIndustryIntro = exports.getIndustryIntro = (0, _req2.default)(_getIndustryIntro, DISCV_GET_INDUSTRY_INTRO);

function _getIndustryPosition(params) {
  return _axios2.default.get('/api/discovery/industry/position?' + _qs2.default.stringify(params), {
    credentials: 'include'
  });
}

var getIndustryPosition = exports.getIndustryPosition = (0, _req2.default)(_getIndustryPosition, DISCV_GET_INDUSTRY_POSITION);

function _getIndustryCompanyList(params) {
  return _axios2.default.get('/api/discovery/industry/company?' + _qs2.default.stringify(params), {
    credentials: 'include'
  });
}

var getIndustryCompanyList = exports.getIndustryCompanyList = (0, _req2.default)(_getIndustryCompanyList, DISCV_GET_INDUSTRY_COMPANY);