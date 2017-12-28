'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleFavorite = exports.saveResume = exports.deleteResume = exports.applyOpp = exports.updateApplyInfo = exports.checkOppAvailable = exports.getMobilePrefix = exports.getUserLastApplyInfo = exports.getUserReusmes = exports.getOppDetail = exports.OPP_DETIAL_FAVORITE = exports.OPP_DETIAL_SAVE_RESUME = exports.OPP_DETIAL_DELETE_RESUME = exports.OPP_DETIAL_APPLY = exports.OPP_DETIAL_CHECK_AVAILABLE = exports.OPP_DETIAL_UPDATE_APPLY_INFO = exports.OPP_DETIAL_GET_LAST_APPLY_INFO = exports.OPP_DETIAL_GET_MOBILE_PREFIX = exports.OPP_DETIAL_GET_RESUME = exports.OPP_DETIAL_GET_DETIAL = undefined;

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _req = require('./req');

var _req2 = _interopRequireDefault(_req);

var _axios = require('../utils/axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OPP_DETIAL_GET_DETIAL = exports.OPP_DETIAL_GET_DETIAL = 'OPP_DETIAL_GET_DETIAL';
var OPP_DETIAL_GET_RESUME = exports.OPP_DETIAL_GET_RESUME = 'OPP_DETIAL_GET_RESUME';
var OPP_DETIAL_GET_MOBILE_PREFIX = exports.OPP_DETIAL_GET_MOBILE_PREFIX = 'OPP_DETIAL_GET_MOBILE_PREFIX';
var OPP_DETIAL_GET_LAST_APPLY_INFO = exports.OPP_DETIAL_GET_LAST_APPLY_INFO = 'OPP_DETIAL_GET_LAST_APPLY_INFO';
var OPP_DETIAL_UPDATE_APPLY_INFO = exports.OPP_DETIAL_UPDATE_APPLY_INFO = 'OPP_DETIAL_UPDATE_APPLY_INFO';
var OPP_DETIAL_CHECK_AVAILABLE = exports.OPP_DETIAL_CHECK_AVAILABLE = 'OPP_DETIAL_CHECK_AVAILABLE';
var OPP_DETIAL_APPLY = exports.OPP_DETIAL_APPLY = 'OPP_DETIAL_APPLY';
var OPP_DETIAL_DELETE_RESUME = exports.OPP_DETIAL_DELETE_RESUME = 'OPP_DETIAL_DELETE_RESUME';
var OPP_DETIAL_SAVE_RESUME = exports.OPP_DETIAL_SAVE_RESUME = 'OPP_DETIAL_SAVE_RESUME';
var OPP_DETIAL_FAVORITE = exports.OPP_DETIAL_FAVORITE = 'OPP_DETIAL_FAVORITE';

function _getOppDetail(_ref) {
  var oppId = _ref.oppId;

  return (0, _axios.get)('/api/opportunities/' + oppId);
}

var getOppDetail = exports.getOppDetail = (0, _req2.default)(_getOppDetail, OPP_DETIAL_GET_DETIAL);

function _getUserResumes(params) {
  return (0, _axios.get)('/api/users/' + params.id + '/attachments');
}

var getUserReusmes = exports.getUserReusmes = (0, _req2.default)(_getUserResumes, OPP_DETIAL_GET_RESUME);

function _getUserLastApplyInfo(params) {
  return (0, _axios.get)('/api/users/' + params.id + '/applications/latest');
}

var getUserLastApplyInfo = exports.getUserLastApplyInfo = (0, _req2.default)(_getUserLastApplyInfo, OPP_DETIAL_GET_LAST_APPLY_INFO);

function _getMobilePrefix() {
  return (0, _axios.get)('/api/mobile-prefixs');
}

var getMobilePrefix = exports.getMobilePrefix = (0, _req2.default)(_getMobilePrefix, OPP_DETIAL_GET_MOBILE_PREFIX);

function _checkOppAvailable(params) {
  return (0, _axios.get)('/api/users/' + params.userId + '/applications/' + params.oppId + '/available');
}

var checkOppAvailable = exports.checkOppAvailable = (0, _req2.default)(_checkOppAvailable, OPP_DETIAL_CHECK_AVAILABLE);

var updateApplyInfo = exports.updateApplyInfo = function updateApplyInfo(params) {
  return {
    type: OPP_DETIAL_UPDATE_APPLY_INFO,
    result: params
  };
};

function _applyOpp(params) {
  return (0, _axios.post)('/api/users/' + params.userId + '/applications', params);
}

var applyOpp = exports.applyOpp = (0, _req2.default)(_applyOpp, OPP_DETIAL_APPLY);

function _deleteReusume(params) {
  return fetch('/api/users/' + params.userId + '/attachments/' + params.attachmentId, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

var deleteResume = exports.deleteResume = (0, _req2.default)(_deleteReusume, OPP_DETIAL_DELETE_RESUME);

function _saveResume(params) {
  return fetch('/api/users/' + params.userId + '/attachments', {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  });
}

var saveResume = exports.saveResume = (0, _req2.default)(_saveResume, OPP_DETIAL_SAVE_RESUME);

function _favoriteOpp(params) {
  if (params.method === 'POST') {
    delete params.method;
    return fetch('/api/users/favorite?' + _qs2.default.stringify(params), {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });
  } else {
    delete params.method;
    return fetch('/api/users/favorite?' + _qs2.default.stringify(params), {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });
  }
}

var toggleFavorite = exports.toggleFavorite = (0, _req2.default)(_favoriteOpp, OPP_DETIAL_FAVORITE);