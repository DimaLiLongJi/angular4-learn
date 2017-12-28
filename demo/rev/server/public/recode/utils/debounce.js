"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = debounce;
function debounce(fn) {
  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

  var timeoutId = 0;
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (timeoutId) return;
    timeoutId = setTimeout(function () {
      timeoutId = 0;
      fn.apply(undefined, args);
    }, delay);
  };
}