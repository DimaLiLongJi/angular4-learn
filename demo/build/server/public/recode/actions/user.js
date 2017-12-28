'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userCheck = exports.getUserInfo = exports.getUserUnreadQuestion = exports.getUserSubscription = exports.subscribeIndustry = exports.checkLogin = exports.USER_CHECK = exports.GET_USER_UNREAD_QUESTION = exports.CHECK_LOGIN = exports.GET_USER_INFO = exports.GET_USER_SUBSCRIPTION = exports.SUBSCRIBE_INDUSTRY = exports.USER_LOGOUT = exports.UPDATE_ACCEPT_STATUS = exports.UPDATE_SUBSCRIBE_STATUS = exports.UPDATE_PREFERENCES = exports.USER_LOAD = undefined;
exports.loadUser = loadUser;
exports.updatePreferences = updatePreferences;
exports.updateSubscribeStatus = updateSubscribeStatus;
exports.updateAcceptStatus = updateAcceptStatus;

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _jsCookie = require('js-cookie');

var _jsCookie2 = _interopRequireDefault(_jsCookie);

var _req = require('./req');

var _req2 = _interopRequireDefault(_req);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var USER_LOAD = exports.USER_LOAD = 'USER_LOAD';
var UPDATE_PREFERENCES = exports.UPDATE_PREFERENCES = 'UPDATE_PREFERENCES';
var UPDATE_SUBSCRIBE_STATUS = exports.UPDATE_SUBSCRIBE_STATUS = 'UPDATE_SUBSCRIBE_STATUS';
var UPDATE_ACCEPT_STATUS = exports.UPDATE_ACCEPT_STATUS = 'UPDATE_ACCEPT_STATUS';
var USER_LOGOUT = exports.USER_LOGOUT = 'USER_LOGOUT';

var SUBSCRIBE_INDUSTRY = exports.SUBSCRIBE_INDUSTRY = 'SUBSCRIBE_INDUSTRY';
var GET_USER_SUBSCRIPTION = exports.GET_USER_SUBSCRIPTION = 'GET_USER_SUBSCRIPTION';
var GET_USER_INFO = exports.GET_USER_INFO = 'GET_USER_INFO';
var CHECK_LOGIN = exports.CHECK_LOGIN = 'CHECK_LOGIN';
var GET_USER_UNREAD_QUESTION = exports.GET_USER_UNREAD_QUESTION = 'GET_USER_UNREAD_QUESTION';
var USER_CHECK = exports.USER_CHECK = 'USER_CHECK';

function loadUser(user) {
  return {
    type: USER_LOAD,
    user: user
  };
}

function _checkLogin(_ref) {
  var _ref$echoStr = _ref.echoStr,
      echoStr = _ref$echoStr === undefined ? _jsCookie2.default.get('echoStr') : _ref$echoStr;

  return fetch('/api/auth/check_login?' + _qs2.default.stringify({ echoStr: echoStr }), {
    credentials: 'include'
  });
}

var checkLogin = exports.checkLogin = (0, _req2.default)(_checkLogin, CHECK_LOGIN, 1);

function updatePreferences(data) {
  return {
    type: UPDATE_PREFERENCES,
    data: data
  };
}

function updateSubscribeStatus(data) {
  return {
    type: UPDATE_SUBSCRIBE_STATUS,
    data: data
  };
}

function updateAcceptStatus(data) {
  return {
    type: UPDATE_ACCEPT_STATUS,
    data: data
  };
}

var subscribeIndustry = exports.subscribeIndustry = function subscribeIndustry(_ref2) {
  var userId = _ref2.userId,
      industryId = _ref2.industryId;
  return {
    url: '/api/users/' + userId + '/subscription',
    method: 'POST',
    params: {
      industryId: industryId,
      userId: userId
    },
    type: SUBSCRIBE_INDUSTRY
  };
};

var getUserSubscription = exports.getUserSubscription = function getUserSubscription(_ref3) {
  var userId = _ref3.userId;
  return {
    url: '/api/users/' + userId + '/subscription',
    type: GET_USER_SUBSCRIPTION
  };
};

var getUserUnreadQuestion = exports.getUserUnreadQuestion = function getUserUnreadQuestion(_ref4) {
  var userId = _ref4.userId;
  return {
    url: '/api/users/' + userId + '/questions/check_read',
    type: GET_USER_UNREAD_QUESTION
  };
};

var getUserInfo = exports.getUserInfo = (0, _req2.default)(function (params) {
  return fetch('/api/auth/user_info?' + _qs2.default.stringify(params), {
    credentials: 'include'
  });
}, GET_USER_INFO, 1);

var userCheck = exports.userCheck = function userCheck(category) {
  return {
    type: USER_CHECK,
    category: category
  };
};