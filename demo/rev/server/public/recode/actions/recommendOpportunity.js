'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePreferenceStatus = exports.getQuestionTag = exports.getProfessionTag = exports.getRecommendOppList = exports.RECOMMENDOPP_UPDATE_PREFERENCE_STATUS = exports.RECOMMENDOPP_GET_OPP_QUESTION_TAG_LIST = exports.RECOMMENDOPP_GET_PROFESSION_TAG_LIST = exports.RECOMMENDOPP_GET_OPP_LIST = undefined;

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _req = require('./req');

var _req2 = _interopRequireDefault(_req);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RECOMMENDOPP_GET_OPP_LIST = exports.RECOMMENDOPP_GET_OPP_LIST = 'RECOMMENDOPP_GET_OPP_LIST';
var RECOMMENDOPP_GET_PROFESSION_TAG_LIST = exports.RECOMMENDOPP_GET_PROFESSION_TAG_LIST = 'RECOMMENDOPP_GET_PROFESSION_TAG_LIST';
var RECOMMENDOPP_GET_OPP_QUESTION_TAG_LIST = exports.RECOMMENDOPP_GET_OPP_QUESTION_TAG_LIST = 'RECOMMENDOPP_GET_OPP_QUESTION_TAG_LIST';
var RECOMMENDOPP_UPDATE_PREFERENCE_STATUS = exports.RECOMMENDOPP_UPDATE_PREFERENCE_STATUS = 'RECOMMENDOPP_UPDATE_PREFERENCE_STATUS';

function _getRecommendOppList(params) {
  for (var key in params) {
    if (!params[key]) {
      delete params[key];
    }
  }
  return fetch('/api/opportunities/customize?' + _qs2.default.stringify(params), {
    credentials: 'include'
  });
}

var getRecommendOppList = exports.getRecommendOppList = (0, _req2.default)(_getRecommendOppList, RECOMMENDOPP_GET_OPP_LIST);

function _getProfessionTag(params) {
  return fetch('/api/professions?' + _qs2.default.stringify(params), {
    credentials: 'include'
  });
}

var getProfessionTag = exports.getProfessionTag = (0, _req2.default)(_getProfessionTag, RECOMMENDOPP_GET_PROFESSION_TAG_LIST);

function _getQuestionTag(params) {
  return fetch('/api/tags?' + _qs2.default.stringify(params), {
    credentials: 'include'
  });
}

var getQuestionTag = exports.getQuestionTag = (0, _req2.default)(_getQuestionTag, RECOMMENDOPP_GET_OPP_QUESTION_TAG_LIST);

var updatePreferenceStatus = exports.updatePreferenceStatus = function updatePreferenceStatus(status) {
  return {
    type: RECOMMENDOPP_UPDATE_PREFERENCE_STATUS,
    status: status
  };
};