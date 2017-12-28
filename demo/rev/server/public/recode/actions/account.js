'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getApplicationList = exports.saveResume = exports.removeResume = exports.getResumeList = exports.getQuestionList = exports.ACC_GET_APPLICATION = exports.ACC_SAVE_RESUME = exports.ACC_DELETE_RESUME = exports.ACC_GET_RESUME_LIST = exports.ACC_GET_QUESTION_LIST = undefined;

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _req = require('./req');

var _req2 = _interopRequireDefault(_req);

var _axios = require('../utils/axios');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ACC_GET_QUESTION_LIST = exports.ACC_GET_QUESTION_LIST = 'ACC_GET_QUESTION_LIST';
var ACC_GET_RESUME_LIST = exports.ACC_GET_RESUME_LIST = 'ACC_GET_RESUME_LIST';
var ACC_DELETE_RESUME = exports.ACC_DELETE_RESUME = 'ACC_DELETE_RESUME';
var ACC_SAVE_RESUME = exports.ACC_SAVE_RESUME = 'ACC_SAVE_RESUME';
var ACC_GET_APPLICATION = exports.ACC_GET_APPLICATION = 'ACC_GET_APPLICATION';

function _getQuestionList(params) {
  return (0, _axios.get)('/api/users/' + params.userId + '/questions?' + _qs2.default.stringify(params));
}

function _getResumeList(params) {
  return fetch('/api/users/' + params.userId + '/attachments', {
    credentials: 'include'
  });
}

function _removeResume(params) {
  return fetch('/api/users/' + params.userId + '/attachments/' + params.resumeId, {
    credentials: 'include',
    method: 'delete'
  });
}

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

function _getApplicationList(params) {
  return fetch('/api/users/' + params.userId + '/applications?' + _qs2.default.stringify(params), {
    credentials: 'include'
  });
}

var getQuestionList = exports.getQuestionList = (0, _req2.default)(_getQuestionList, ACC_GET_QUESTION_LIST);
var getResumeList = exports.getResumeList = (0, _req2.default)(_getResumeList, ACC_GET_RESUME_LIST);
var removeResume = exports.removeResume = (0, _req2.default)(_removeResume, ACC_DELETE_RESUME);
var saveResume = exports.saveResume = (0, _req2.default)(_saveResume, ACC_SAVE_RESUME);
var getApplicationList = exports.getApplicationList = (0, _req2.default)(_getApplicationList, ACC_GET_APPLICATION);