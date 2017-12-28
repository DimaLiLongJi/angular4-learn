'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _question = require('../actions/question');

var defaultData = {
  questionList: {},
  listParams: {
    all: 1,
    pageNum: 1,
    itemsPerPage: 10,
    keyword: '',
    userId: undefined
  }
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultData;
  var action = arguments[1];

  switch (action.type) {
    case _question.QA_GET_QUESTION_LIST:
      return getQuestionList(state, action) || state;
      break;
    case _question.QA_ADD_QUESTION_FAVORITE:
      return addQuestionFavorite(state, action) || state;
      break;
    case _question.QA_CANCEL_QUESTION_FAVORITE:
      return cancelQuestionFavorite(state, action) || state;
      break;
    default:
      return state;
  }
};

function getQuestionList(state, action) {
  if (action.stage === 'start') {
    return _extends({}, state, {
      listParams: action.params
    });
  }
  if (action.stage === 'result') {
    return _extends({}, state, {
      questionList: action.result,
      listParams: action.params
    });
  }
}

function addQuestionFavorite(state, action) {
  if (action.stage === 'result') {
    var questionList = Object.assign({}, state.questionList);
    questionList.questions.forEach(function (q) {
      if (q.id === action.params.entityId) {
        q.isFavorite = 1;
        console.log('add question', q);
      }
    });
    return _extends({}, state, {
      questionList: questionList
    });
  }
}

function cancelQuestionFavorite(state, action) {
  if (action.stage === 'result') {
    var questionList = Object.assign({}, state.questionList);
    questionList.questions.forEach(function (q) {
      if (q.id === action.params.entityId) {
        q.isFavorite = 0;
        console.log('cancel question', q);
      }
    });
    return _extends({}, state, {
      questionList: questionList
    });
  }
}