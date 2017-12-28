'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _allOpportunity = require('../actions/allOpportunity');

var defaultData = {
  listParams: {
    industryId: undefined,
    locationId: undefined,
    pageNum: 1,
    itemsPerPage: 20
  },
  totalItems: 0,
  opps: [],
  locationTag: [],
  oppLocationTag: []
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultData;
  var action = arguments[1];

  switch (action.type) {
    case _allOpportunity.ALLOPP_GET_OPP_LIST:
      return ReadOppList(state, action) || state;
    case _allOpportunity.ALLOPP_GET_LOCATION_TAG_LIST:
      return ReadLocationTag(state, action) || state;
      break;
    case _allOpportunity.ALLOPP_GET_OPP_LOCATION_TAG_LIST:
      return ReadOppLocationTag(state, action) || state;
      break;
    default:
      return state;
  }
};

function ReadOppLocationTag(state, action) {
  if (action.stage === 'result') {
    return _extends({}, state, {
      oppLocationTag: action.result
    });
  }
}

function ReadLocationTag(state, action) {
  if (action.stage === 'result') {
    return _extends({}, state, {
      locationTag: action.result
    });
  }
}

function ReadOppList(state, action) {
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