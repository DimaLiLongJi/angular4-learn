'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('../actions/config');

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case _config.CONFIG_LOAD:
      return action.config || state;
      break;
    default:
      return state;
      break;
  }
};