'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alert = require('../actions/alert');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var defaultData = {
  alerts: [{
    type: 'error',
    message: 'test error'
  }]
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultData;
  var action = arguments[1];

  switch (action.type) {
    case _alert.ALERT_ADD:
      return {
        alerts: [].concat(_toConsumableArray(state.alerts), [action.alert])
      };
    default:
      return state;
  }
};