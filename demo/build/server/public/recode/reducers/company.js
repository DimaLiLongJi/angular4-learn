'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _company = require('../actions/company');

var defaultData = {
  company: {},
  similarCompanies: [],
  opportunityList: {},
  campusOpportunityList: [],
  backgroundImage: ''
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultData;
  var action = arguments[1];

  switch (action.type) {
    case _company.CMPY_GET_COMPANY_DETAIL:
      return handleCompanyDetail(state, action) || state;
      break;
    case _company.CMPY_GET_SIMILAR_COMPANIES:
      return handleSimilarOpps(state, action) || state;
      break;
    case _company.CMPY_GET_OPP_LIST:
      return handleOppList(state, action) || state;
      break;
    case _company.CMPY_GET_CAMPUS_OPP_LIST:
      return handleCampusOppList(state, action) || state;
      break;
    case _company.CMPY_GEN_BG:
      {
        var backgroundImage = state || randomBg();
        return _extends({}, state, {
          backgroundImage: backgroundImage
        });
      }
      break;
    default:
      return state;
  }
};

function handleCompanyDetail(state, action) {
  if (action.stage === 'result') {
    var result = action.result;

    return _extends({}, state, {
      company: result
    });
  }
}

function handleSimilarOpps(state, action) {
  if (action.stage === 'result') {
    var result = action.result;

    return _extends({}, state, {
      similarCompanies: result
    });
  }
}

function handleOppList(state, action) {
  if (action.stage === 'result') {
    var result = action.result;

    return _extends({}, state, {
      opportunityList: result
    });
  }
}

function handleCampusOppList(state, action) {
  if (action.stage === 'result') {
    var result = action.result;

    return _extends({}, state, {
      campusOpportunityList: result
    });
  }
}

function randomBg() {
  if (Math.random() > 0.5) {
    return "url('/images/banner-company.jpg')";
  } else {
    return "url('/images/banner-company2.jpg')";
  }
}