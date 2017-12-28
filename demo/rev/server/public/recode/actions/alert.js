'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.alertError = alertError;
exports.alertSuccess = alertSuccess;
var ALERT_ADD = 'ALERT_ADD';

function alertError(e) {
  return {
    type: ALERT_ADD,
    alert: {
      type: 'error',
      message: e
    }
  };
}

function alertSuccess(e) {
  return {
    type: ALERT_ADD,
    alert: {
      type: 'success',
      message: e
    }
  };
}