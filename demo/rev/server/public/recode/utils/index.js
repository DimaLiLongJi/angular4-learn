'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fd = fd;
exports.fff = fff;
exports.debounce = debounce;
exports.interval = interval;
exports.parseUrlParams = parseUrlParams;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fd(d) {
  return (0, _moment2.default)(d).format('YYYY-MM-DD');
}

function fff(list, f1, val, f2) {
  var found = list.find(function (l) {
    return l[f1] === val;
  });
  return found && found[f2];
}

function debounce(fn, delay) {
  var timeoutId = 0;
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
      fn.apply(undefined, args);
    }, delay || 100);
  };
}

function interval(fn, interval) {
  var timeoutId = 0;
  return function () {
    if (timeoutId) return;
    fn.apply(undefined, arguments);
    timeoutId = setTimeout(function () {
      timeoutId = 0;
    }, interval || 100);
  };
}

function parseUrlParams(props) {
  if (!global.window) return {};
  var qsParams = window.location.search.length && _qs2.default.parse(window.location.search.substring(1)) || {};
  var out = Object.assign({}, qsParams, props.match ? props.match.params : {});
  Object.keys(out).forEach(function (k) {
    var val = out[k];
    if (/^\d+$/.test(val)) out[k] = Number(val);
  });
  return out;
}