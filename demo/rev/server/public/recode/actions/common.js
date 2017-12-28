'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InitPath = exports.COMN_INIT_PATH = undefined;
exports.uiError = uiError;

var _axios = require('../utils/axios');

var COMN_INIT_PATH = exports.COMN_INIT_PATH = 'COMN_INIT_PATH';

var InitPath = exports.InitPath = function InitPath(initPath) {
  return {
    type: COMN_INIT_PATH,
    initPath: initPath
  };
};

function uiError(params) {
  return (0, _axios.post)('/api/ui_error', params);
}