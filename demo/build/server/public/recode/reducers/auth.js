'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _auth = require('../actions/auth');

var defaultState = {
  loginSuccess: false,
  tempQrcodeTicket: undefined,
  loginModalConfig: {
    visible: false,
    qrcodeType: 0
  }
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments[1];

  switch (action.type) {
    case _auth.CLOSE_LOGIN_MODAL:
      {
        return _extends({}, state, {
          loginModalConfig: _extends({}, state.loginModalConfig, {
            visible: false
          })
        });
        break;
      }
    case _auth.OPEN_LOGIN_MODAL:
      {
        return _extends({}, state, {
          loginModalConfig: _extends({}, action.config, {
            visible: true
          })
        });
        break;
      }
    case _auth.GET_TEMP_QRCODE_TICKET:
      return _extends({}, state, {
        tempQrcodeTicket: action.result && action.result.ticket
      });
      break;
    default:
      return state;
  }
};