'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveInput = exports.visitCompany = exports.checkCount = exports.updateAnimProgress = exports.removeFavorite = exports.addFavorite = exports.submitQuestion = exports.getDanmuList = exports.DM_SAVE_INPUT = exports.DM_VISIT_COMPANY = exports.DM_CHECK_COUNT = exports.DM_UPDATE_PROGRESS = exports.DM_RM_FAVORITE = exports.DM_ADD_FAVORITE = exports.DM_SUB_QUESTION = exports.DM_GET_DANMU_SESSION = exports.DM_GET_DANMU = exports.DM_TOGGLE_BANNER = exports.DM_TOGGLE_DANMU = undefined;
exports.toggleDanmu = toggleDanmu;
exports.toggleBanner = toggleBanner;

var _req = require('./req');

var _req2 = _interopRequireDefault(_req);

var _axios = require('../utils/axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DM_TOGGLE_DANMU = exports.DM_TOGGLE_DANMU = 'DM_TOGGLE_DANMU';
var DM_TOGGLE_BANNER = exports.DM_TOGGLE_BANNER = 'DM_TOGGLE_BANNER';
var DM_GET_DANMU = exports.DM_GET_DANMU = 'DM_GET_DANMU';
var DM_GET_DANMU_SESSION = exports.DM_GET_DANMU_SESSION = 'DM_GET_DANMU_SESSION';
var DM_SUB_QUESTION = exports.DM_SUB_QUESTION = 'DM_SUB_QUESTION';
var DM_ADD_FAVORITE = exports.DM_ADD_FAVORITE = 'DM_ADD_FAVORITE';
var DM_RM_FAVORITE = exports.DM_RM_FAVORITE = 'DM_RM_FAVORITE';
var DM_UPDATE_PROGRESS = exports.DM_UPDATE_PROGRESS = 'DM_UPDATE_PROGRESS';
var DM_CHECK_COUNT = exports.DM_CHECK_COUNT = 'DM_CHECK_COUNT';
var DM_VISIT_COMPANY = exports.DM_VISIT_COMPANY = 'DM_VISIT_COMPANY';
var DM_SAVE_INPUT = exports.DM_SAVE_INPUT = 'DM_SAVE_INPUT';

function toggleDanmu(onoff) {
  return {
    type: DM_TOGGLE_DANMU
  };
}

function toggleBanner(onoff) {
  return {
    type: DM_TOGGLE_BANNER,
    on: !!onoff
  };
}

function _getDanmuList(_ref) {
  var userId = _ref.userId;

  var uri = '/api/danmu' + (userId ? '/customize' : '');
  return (0, _axios.get)(uri, {
    params: { userId: userId }
  });
}

var getDanmuList = exports.getDanmuList = (0, _req2.default)(_getDanmuList, DM_GET_DANMU, 1);

function _submitQuestion(params) {
  return (0, _axios.post)('/api/users/' + params.userId + '/questions', params);
}

var submitQuestion = exports.submitQuestion = (0, _req2.default)(_submitQuestion, DM_SUB_QUESTION, 1);

function _addFavorite(params) {
  return (0, _axios.post)('/api/users/favorite', params);
}

var addFavorite = exports.addFavorite = (0, _req2.default)(_addFavorite, DM_ADD_FAVORITE, 1);

function _removeFavorite(params) {
  return _axios2.default.delete('/api/users/favorite', params);
}

var removeFavorite = exports.removeFavorite = (0, _req2.default)(_removeFavorite, DM_RM_FAVORITE, 1);

var updateAnimProgress = exports.updateAnimProgress = function updateAnimProgress(animProgress) {
  return {
    type: DM_UPDATE_PROGRESS,
    animProgress: animProgress
  };
};

function _checkCount(params) {
  return (0, _axios.post)('/api/users/' + params.userId + '/questions', params);
}

var checkCount = exports.checkCount = (0, _req2.default)(_checkCount, DM_CHECK_COUNT, 1);

var visitCompany = exports.visitCompany = function visitCompany(_ref2) {
  var group = _ref2.group,
      id = _ref2.id;
  return {
    type: DM_VISIT_COMPANY,
    group: group,
    id: id
  };
};

var saveInput = exports.saveInput = function saveInput(value) {
  return {
    type: DM_SAVE_INPUT,
    value: value
  };
};