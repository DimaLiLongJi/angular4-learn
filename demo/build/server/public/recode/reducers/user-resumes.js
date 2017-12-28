'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _account = require('../actions/account');

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var defaultData = {
  resumeList: []
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultData;
  var action = arguments[1];

  switch (action.type) {
    case _account.ACC_GET_RESUME_LIST:
      return handleResumeList(state, action) || state;
      break;
    case _account.ACC_DELETE_RESUME:
      return handleDeleteResume(state, action);
      break;
    case _account.ACC_SAVE_RESUME:
      return handleSaveResume(state, action);
      break;
    default:
      return state;
  }
};

function handleResumeList(state, action) {
  if (action.stage === 'result') {
    var result = action.result;

    return _extends({}, state, {
      resumeList: result
    });
  }
}

function handleDeleteResume(state, action) {
  if (action.stage === 'result' && action.result[0] === 1) {
    var list = [].concat(state.resumeList);
    list = list.filter(function (l) {
      return l.id !== action.params.resumeId;
    });
    return _extends({}, state, {
      resumeList: list
    });
  }
  return state;
}

function handleSaveResume(state, action) {
  if (action.stage === 'result') {
    var list = [].concat(state.resumeList);
    list.push(action.result);
    return _extends({}, state, {
      resumeList: list
    });
  }
  return state;
}