'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _recommendOpportunity = require('../actions/recommendOpportunity');

var defaultData = {
  listParams: {
    pageNum: 1,
    itemsPerPage: 20
  },
  totalItems: 0,
  opps: [],
  professionTag: [],
  questionTag: []
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultData;
  var action = arguments[1];

  switch (action.type) {
    case _recommendOpportunity.RECOMMENDOPP_GET_OPP_LIST:
      return ReadRecommendList(state, action) || state;
    case _recommendOpportunity.RECOMMENDOPP_GET_PROFESSION_TAG_LIST:
      return ReadProfessionTag(state, action) || state;
      break;
    case _recommendOpportunity.RECOMMENDOPP_GET_OPP_QUESTION_TAG_LIST:
      return ReadQuestionTag(state, action) || state;
      break;
    case _recommendOpportunity.RECOMMENDOPP_UPDATE_PREFERENCE_STATUS:
      return _extends({}, state, {
        customizeStatus: action.status
      });
      break;
    default:
      return state;
  }
};

function ReadQuestionTag(state, action) {
  if (action.stage === 'result') {
    return _extends({}, state, {
      questionTag: action.result
    });
  }
}

function ReadProfessionTag(state, action) {
  if (action.stage === 'result') {
    return _extends({}, state, {
      professionTag: action.result
    });
  }
}

function ReadRecommendList(state, action) {
  if (action.stage === 'start') {
    return _extends({}, state, {
      listParams: _extends({}, action.params)
    });
  }
  if (action.stage === 'result') {
    return _extends({}, state, {
      opps: action.result.opps,
      totalItems: action.result.totalItems
    });
  }
}