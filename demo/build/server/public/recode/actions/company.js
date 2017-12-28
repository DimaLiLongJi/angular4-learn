'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCampusOppList = exports.getOpportunityList = exports.getSimilarCompanies = exports.getCompanyDetail = exports.CMPY_GET_CAMPUS_OPP_LIST = exports.CMPY_GET_OPP_LIST = exports.CMPY_KEYWORD_UPDATE = exports.CMPY_GET_SIMILAR_COMPANIES = exports.CMPY_GET_COMPANY_DETAIL = undefined;

require('isomorphic-fetch');

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _req = require('./req');

var _req2 = _interopRequireDefault(_req);

var _axios = require('../utils/axios');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CMPY_GET_COMPANY_DETAIL = exports.CMPY_GET_COMPANY_DETAIL = 'CMPY_GET_COMPANY_DETAIL';
var CMPY_GET_SIMILAR_COMPANIES = exports.CMPY_GET_SIMILAR_COMPANIES = 'CMPY_GET_SIMILAR_COMPANIES';
var CMPY_KEYWORD_UPDATE = exports.CMPY_KEYWORD_UPDATE = 'CMPY_KEYWORD_UPDATE';
var CMPY_GET_OPP_LIST = exports.CMPY_GET_OPP_LIST = 'CMPY_GET_OPP_LIST';
var CMPY_GET_CAMPUS_OPP_LIST = exports.CMPY_GET_CAMPUS_OPP_LIST = 'CMPY_GET_CAMPUS_OPP_LIST';

function _getCompanyDetail(_ref) {
  var companyId = _ref.companyId;

  return (0, _axios.get)('/api/companies/' + companyId);
}

var getCompanyDetail = exports.getCompanyDetail = (0, _req2.default)(_getCompanyDetail, CMPY_GET_COMPANY_DETAIL);

function _getSimilarCompanies(_ref2) {
  var companyId = _ref2.companyId;

  return (0, _axios.get)('/api/similar_companies/' + companyId);
}

var getSimilarCompanies = exports.getSimilarCompanies = (0, _req2.default)(_getSimilarCompanies, CMPY_GET_SIMILAR_COMPANIES);

function _getOpportunityList(_ref3) {
  var companyId = _ref3.companyId,
      _ref3$getAll = _ref3.getAll,
      getAll = _ref3$getAll === undefined ? 1 : _ref3$getAll;

  return (0, _axios.get)('/api/opportunities?' + _qs2.default.stringify({
    companyId: companyId,
    getAll: getAll
  }));
}

var getOpportunityList = exports.getOpportunityList = (0, _req2.default)(_getOpportunityList, CMPY_GET_OPP_LIST);

function _getCampusOppList(_ref4) {
  var companyId = _ref4.companyId;

  return (0, _axios.get)('/api/campus_recruits/companies/' + companyId + '/opportunities');
}

var getCampusOppList = exports.getCampusOppList = (0, _req2.default)(_getCampusOppList, CMPY_GET_CAMPUS_OPP_LIST);