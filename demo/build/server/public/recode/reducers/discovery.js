'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _discovery = require('../constants/discovery');

var _discovery2 = require('../actions/discovery');

var defaultData = {
  industryList: _discovery.INDUSTRY_LIST.map(function (i) {
    return _extends({}, i);
  }),
  selectedIndustry: _discovery.INDUSTRY_LIST[0]
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultData;
  var action = arguments[1];

  switch (action.type) {
    case _discovery2.DISCV_GET_INDUSTRY_INTRO:
      return getIndustryIntro(state, action);
    case _discovery2.DISCV_GET_INDUSTRY_POSITION:
      return getIndustryPosition(state, action);
    case _discovery2.DISCV_GET_INDUSTRY_COMPANY:
      return getIndustryCompany(state, action);
    case _discovery2.DISCV_SELECT_INDUSTRY:
      if (action.params) {
        return _extends({}, state, {
          selectedIndustry: action.params
        });
      }
    default:
      return state;
  }
};

function getIndustryCompany(state, action) {
  if (action.stage === 'result') {
    var selectedIndustry = Object.assign({ companies: action.result.industryCompanies }, state.selectedIndustry);
    return _extends({}, state, {
      selectedIndustry: selectedIndustry
    });
  }
  return state;
}

function getIndustryPosition(state, action) {
  if (action.stage === 'result') {
    var selectedIndustry = Object.assign({ positions: action.result.industryPositions }, state.selectedIndustry);
    return _extends({}, state, {
      selectedIndustry: selectedIndustry
    });
  }
  return state;
}

function getIndustryIntro(state, action) {
  if (action.stage === 'result') {
    var selectedIndustry = Object.assign({ intro: action.result }, state.selectedIndustry);
    return _extends({}, state, {
      selectedIndustry: selectedIndustry
    });
  }
  return state;
}