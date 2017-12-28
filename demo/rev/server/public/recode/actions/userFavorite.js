'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteUserFavorite = exports.getUserFavoritesList = exports.USER_DEL_FAVORITE = exports.USER_GET_FAVORITES_LIST = undefined;

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _req = require('./req');

var _req2 = _interopRequireDefault(_req);

var _axios = require('../utils/axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var USER_GET_FAVORITES_LIST = exports.USER_GET_FAVORITES_LIST = 'USER_GET_FAVORITES_LIST';
var USER_DEL_FAVORITE = exports.USER_DEL_FAVORITE = 'USER_DEL_FAVORITE';

function _getUserFavorites(params) {
  return _axios2.default.get('/api/users/' + params.userId + '/favorite?' + _qs2.default.stringify(params));
}

var getUserFavoritesList = exports.getUserFavoritesList = (0, _req2.default)(_getUserFavorites, USER_GET_FAVORITES_LIST, 1);

function _deleteUserFavorite(params) {
  return _axios2.default.delete('/api/users/favorite?' + _qs2.default.stringify(params));
}

var deleteUserFavorite = exports.deleteUserFavorite = (0, _req2.default)(_deleteUserFavorite, USER_DEL_FAVORITE, 1);