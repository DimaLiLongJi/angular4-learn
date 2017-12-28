'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _account = require('../actions/account');

var defaultData = {
  questionList: {
    questions: [],
    totalItems: 0,
    pageNum: 1,
    itemsPerPage: 10
  }
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultData;
  var action = arguments[1];

  switch (action.type) {
    case _account.ACC_GET_QUESTION_LIST:
      return handleQuestionList(state, action) || state;
      break;
    default:
      return state;
  }
};

function handleQuestionList(state, action) {
  if (action.stage === 'result') {
    var result = action.result;

    return _extends({}, state, {
      questionList: result
    });
  }
}