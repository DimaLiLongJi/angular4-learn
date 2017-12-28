'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _user = require('../actions/user');

var _jsCookie = require('js-cookie');

var _jsCookie2 = _interopRequireDefault(_jsCookie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var defaultData = {
  preferences: [],
  isPreferenced: false
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultData;
  var action = arguments[1];

  switch (action.type) {
    case _user.USER_LOAD:
      return action.user || state;
      break;
    case _user.UPDATE_PREFERENCES:
      return _extends({}, state, {
        preferences: action.data,
        isPreferenced: 1
      });
      break;
    case _user.CHECK_LOGIN:
      {
        var echoStr = state.echoStr || _jsCookie2.default.get('echoStr');
        if (action.result && action.result.id) {
          return _extends({}, state, action.result, {
            loginSuccess: true
          });
        }
        if (state.echoStr) {
          return _extends({}, state, {
            echoStr: echoStr
          });
        }
        return state;
        break;
      }
    case _user.SUBSCRIBE_INDUSTRY:
      console.log(state);
      return _extends({}, state, {
        subscription: [].concat(_toConsumableArray(state.subscription || []), [action.result])
      });
      break;
    case _user.GET_USER_SUBSCRIPTION:
      console.log('GET_USER_SUBSCRIPTION', action);
      return _extends({}, state, {
        subscription: action.result
      });
    case _user.UPDATE_SUBSCRIBE_STATUS:
      return _extends({}, state, {
        subscribe: action.data
      });
      break;
    case _user.UPDATE_ACCEPT_STATUS:
      return _extends({}, state, {
        acceptPush: action.data
      });
      break;
    case _user.GET_USER_INFO:
      console.log(action);
      return _extends({}, state, action.result);
      break;
    case _user.GET_USER_UNREAD_QUESTION:
      return _extends({}, state, {
        answerChecked: action.result.allChecked
      });
      break;
    case _user.USER_CHECK:
      if (action.category && action.category === 'answer') {
        return _extends({}, state, {
          answerChecked: 1
        });
      } else if (action.category && action.category === 'application') {
        return _extends({}, state, {
          applicationCheckedNotice: 0
        });
      }

      break;
    default:
      return state;
  }
};