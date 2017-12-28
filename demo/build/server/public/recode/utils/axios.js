'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.put = exports.post = exports.get = undefined;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_axios2.default.defaults.baseURL = 'http://test.college.careerfrog.com.cn';
_axios2.default.defaults.withCredentials = true;

if (['test', 'production'].indexOf(process.env.NODE_NEV) > -1) {
  var hostname = (process.env.NODE_NEV === 'production' ? '' : 'test.') + 'college.careerfrog.com.cn';
  _axios2.default.defaults.baseURL = 'http://127.0.0.1:' + process.env.PORT + '/';
  _axios2.default.defaults.headers.common['Host'] = hostname;
}

if (global.window) {
  _axios2.default.defaults.baseURL = window.location.origin;
}

var get = exports.get = _axios2.default.get;
var post = exports.post = _axios2.default.post;
var put = exports.put = _axios2.default.put;
exports.default = _axios2.default;