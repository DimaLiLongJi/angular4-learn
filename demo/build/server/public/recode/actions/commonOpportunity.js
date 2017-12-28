'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateAnimationDuration = exports.COMMON_OPP_UPDATE_ANIMATION_DURATION = exports.updateUserAcceptPushStatus = exports.COMMON_OPP_UPDATE_ACCEPT_PUSH_STATUS = exports.updateUserCustomizeStatus = exports.COMMON_OPP_UPDATE_CUSTOMIZE_STATUS = exports.updateUserPreference = exports.COMMON_OPP_UPDATE_PREFERENCES = exports.initUserPreference = exports.COMMON_OPP_INIT_USER_PREFERENCE = exports.initUserWechatInfo = exports.COMMON_OPP_INIT_USER_WECHAT_INFO = exports.updateKeyword = exports.getIndustryTag = exports.COMMON_OPP_GET_UPDATE_PUSH_STATUS = exports.COMMON_OPP_GET_PUSH_STATUS = exports.COMMON_OPP_UPDATE_PREFERENCE_STATUS = exports.COMMON_OPP_UPDATE_KEYWORD = exports.COMMON_OPP_GET_INDUSTRY_TAG = undefined;

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _req = require('./req');

var _req2 = _interopRequireDefault(_req);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var COMMON_OPP_GET_INDUSTRY_TAG = exports.COMMON_OPP_GET_INDUSTRY_TAG = 'COMMON_OPP_GET_INDUSTRY_TAG';
var COMMON_OPP_UPDATE_KEYWORD = exports.COMMON_OPP_UPDATE_KEYWORD = 'COMMON_OPP_UPDATE_KEYWORD';
var COMMON_OPP_UPDATE_PREFERENCE_STATUS = exports.COMMON_OPP_UPDATE_PREFERENCE_STATUS = 'COMMON_OPP_UPDATE_PREFERENCE_STATUS';
var COMMON_OPP_GET_PUSH_STATUS = exports.COMMON_OPP_GET_PUSH_STATUS = 'COMMON_OPP_GET_PUSH_STATUS';
var COMMON_OPP_GET_UPDATE_PUSH_STATUS = exports.COMMON_OPP_GET_UPDATE_PUSH_STATUS = 'COMMON_OPP_GET_UPDATE_PUSH_STATUS';

function _getIndustryTag(params) {
  return fetch('/api/opportunities/statistics/industry?' + _qs2.default.stringify(params), {
    credentials: 'include'
  });
}

var getIndustryTag = exports.getIndustryTag = (0, _req2.default)(_getIndustryTag, COMMON_OPP_GET_INDUSTRY_TAG);

var updateKeyword = exports.updateKeyword = function updateKeyword(keyword) {
  return {
    type: COMMON_OPP_UPDATE_KEYWORD,
    keyword: keyword
  };
};

function _initUserWechatInfo(_ref) {
  var userId = _ref.userId;

  return fetch('/api/auth/' + userId + '/refresh_token', {
    credentials: 'include'
  });
}
var COMMON_OPP_INIT_USER_WECHAT_INFO = exports.COMMON_OPP_INIT_USER_WECHAT_INFO = 'COMMON_OPP_INIT_USER_WECHAT_INFO';
var initUserWechatInfo = exports.initUserWechatInfo = (0, _req2.default)(_initUserWechatInfo, COMMON_OPP_INIT_USER_WECHAT_INFO);

function _initUserPreference(params) {
  return fetch('/api/users/' + params.userId + '/customize', {
    credentials: 'include'
  });
}
var COMMON_OPP_INIT_USER_PREFERENCE = exports.COMMON_OPP_INIT_USER_PREFERENCE = 'COMMON_OPP_INIT_USER_PREFERENCE';
var initUserPreference = exports.initUserPreference = (0, _req2.default)(_initUserPreference, COMMON_OPP_INIT_USER_PREFERENCE);

function _updateUserPreference(_ref2) {
  var industries = _ref2.industries,
      positions = _ref2.positions,
      locations = _ref2.locations,
      stages = _ref2.stages,
      userId = _ref2.userId;

  var newParams = {
    industryIds: industries.map(function (tag) {
      return tag.id;
    }),
    positionIds: positions.map(function (tag) {
      return tag.id;
    }),
    locationIds: locations.map(function (tag) {
      return tag.id;
    }),
    stageIds: stages.map(function (tag) {
      return tag.id;
    }),
    userId: userId
  };
  return fetch('/api/users/customize', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newParams)
  });
}
var COMMON_OPP_UPDATE_PREFERENCES = exports.COMMON_OPP_UPDATE_PREFERENCES = 'COMMON_OPP_UPDATE_PREFERENCES';
var updateUserPreference = exports.updateUserPreference = (0, _req2.default)(_updateUserPreference, COMMON_OPP_UPDATE_PREFERENCES);

var COMMON_OPP_UPDATE_CUSTOMIZE_STATUS = exports.COMMON_OPP_UPDATE_CUSTOMIZE_STATUS = 'COMMON_OPP_UPDATE_CUSTOMIZE_STATUS';
var updateUserCustomizeStatus = exports.updateUserCustomizeStatus = function updateUserCustomizeStatus(_ref3) {
  var customizeStatus = _ref3.customizeStatus;
  return {
    type: COMMON_OPP_UPDATE_CUSTOMIZE_STATUS,
    customizeStatus: customizeStatus
  };
};

function _updateUserAcceptPushStatus(params) {
  return fetch('/api/users/accept_push', {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  });
}

var COMMON_OPP_UPDATE_ACCEPT_PUSH_STATUS = exports.COMMON_OPP_UPDATE_ACCEPT_PUSH_STATUS = 'COMMON_OPP_UPDATE_ACCEPT_PUSH_STATUS';
var updateUserAcceptPushStatus = exports.updateUserAcceptPushStatus = (0, _req2.default)(_updateUserAcceptPushStatus, COMMON_OPP_UPDATE_ACCEPT_PUSH_STATUS);

var COMMON_OPP_UPDATE_ANIMATION_DURATION = exports.COMMON_OPP_UPDATE_ANIMATION_DURATION = 'COMMON_OPP_UPDATE_ANIMATION_DURATION';
var updateAnimationDuration = exports.updateAnimationDuration = function updateAnimationDuration(duration) {
  return {
    type: COMMON_OPP_UPDATE_ANIMATION_DURATION,
    duration: duration
  };
};