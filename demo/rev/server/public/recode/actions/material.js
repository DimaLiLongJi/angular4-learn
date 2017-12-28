'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMaterials = exports.getPapers = exports.getAllMaterials = exports.countDownloadMaterial = exports.countViewMaterial = exports.updateIndustryId = exports.updateKeyword = exports.INTM_GET_MATERIALS = exports.INTM_GET_PARERS = exports.INTM_GET_ALL_MATERIALS = exports.INTM_LIST_INDUSTRYID_UPDATE = exports.INTM_LIST_KEYWORD_UPDATE = exports.INTM_DOWNLOAD_MATERIAL = exports.INTM_VIEW_MATERIAL = undefined;

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _req = require('./req');

var _req2 = _interopRequireDefault(_req);

var _axios = require('../utils/axios');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var INTM_VIEW_MATERIAL = exports.INTM_VIEW_MATERIAL = 'INTM_VIEW_MATERIAL';
var INTM_DOWNLOAD_MATERIAL = exports.INTM_DOWNLOAD_MATERIAL = 'INTM_DOWNLOAD_MATERIAL';
var INTM_LIST_KEYWORD_UPDATE = exports.INTM_LIST_KEYWORD_UPDATE = 'INTM_LIST_KEYWORD_UPDATE';
var INTM_LIST_INDUSTRYID_UPDATE = exports.INTM_LIST_INDUSTRYID_UPDATE = 'INTM_LIST_INDUSTRYID_UPDATE';
var INTM_GET_ALL_MATERIALS = exports.INTM_GET_ALL_MATERIALS = 'INTM_GET_ALL_MATERIALS';
var INTM_GET_PARERS = exports.INTM_GET_PARERS = 'INTM_GET_PARERS';
var INTM_GET_MATERIALS = exports.INTM_GET_MATERIALS = 'INTM_GET_MATERIALS';

var updateKeyword = exports.updateKeyword = function updateKeyword(keyword) {
  return {
    type: INTM_LIST_KEYWORD_UPDATE,
    keyword: keyword
  };
};

var updateIndustryId = exports.updateIndustryId = function updateIndustryId(industryId) {
  return {
    type: INTM_LIST_INDUSTRYID_UPDATE,
    industryId: industryId
  };
};

function _countViewMaterial(id) {
  return (0, _axios.get)('/api/materials/' + id + '/view');
}

var countViewMaterial = exports.countViewMaterial = (0, _req2.default)(_countViewMaterial, INTM_VIEW_MATERIAL);

function _countDownloadMaterial(id) {
  return (0, _axios.get)('/api/materials/' + id + '/download');
}

var countDownloadMaterial = exports.countDownloadMaterial = (0, _req2.default)(_countDownloadMaterial, INTM_DOWNLOAD_MATERIAL);

function _getMaterials(params) {
  return (0, _axios.get)('/api/materials?' + _qs2.default.stringify(params));
}

var getAllMaterials = exports.getAllMaterials = (0, _req2.default)(_getMaterials, INTM_GET_ALL_MATERIALS);
var getPapers = exports.getPapers = (0, _req2.default)(_getMaterials, INTM_GET_PARERS);
var getMaterials = exports.getMaterials = (0, _req2.default)(_getMaterials, INTM_GET_MATERIALS);