'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addQuestionFavorite = exports.cancelQuestionFavorite = exports.getQuestionList = exports.QA_ADD_QUESTION_FAVORITE = exports.QA_CANCEL_QUESTION_FAVORITE = exports.QA_GET_QUESTION_LIST = undefined;

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _req = require('./req');

var _req2 = _interopRequireDefault(_req);

var _axios = require('../utils/axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QA_GET_QUESTION_LIST = exports.QA_GET_QUESTION_LIST = 'QA_GET_QUESTION_LIST';
var QA_CANCEL_QUESTION_FAVORITE = exports.QA_CANCEL_QUESTION_FAVORITE = 'QA_CANCEL_QUESTION_FAVORITE';
var QA_ADD_QUESTION_FAVORITE = exports.QA_ADD_QUESTION_FAVORITE = 'QA_ADD_QUESTION_FAVORITE';

function _getQuestionList(params) {
  return _axios2.default.get('/api/users/questions?' + _qs2.default.stringify(params));
}
var getQuestionList = exports.getQuestionList = (0, _req2.default)(_getQuestionList, QA_GET_QUESTION_LIST, 1);

function _cancelQuestionFavorite(params) {
  return _axios2.default.delete('/api/users/favorite?' + _qs2.default.stringify(params));
}
var cancelQuestionFavorite = exports.cancelQuestionFavorite = (0, _req2.default)(_cancelQuestionFavorite, QA_CANCEL_QUESTION_FAVORITE, 1);

function _addQuestionFavorite(params) {
  return _axios2.default.post('/api/users/favorite', params);
}
var addQuestionFavorite = exports.addQuestionFavorite = (0, _req2.default)(_addQuestionFavorite, QA_ADD_QUESTION_FAVORITE, 1);