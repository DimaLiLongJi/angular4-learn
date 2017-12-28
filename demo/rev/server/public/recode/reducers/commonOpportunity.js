'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _commonOpportunity = require('../actions/commonOpportunity');

var defaultData = {
  keyword: '',
  industryTag: [],
  isPreferenced: undefined,
  acceptPush: 0,
  customizeStatus: 'uncustomize',
  animationDuration: 0,
  subscribe: false,
  preferences: {
    industries: [],
    positions: [],
    locations: [],
    stages: []
  }
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultData;
  var action = arguments[1];

  switch (action.type) {
    case _commonOpportunity.COMMON_OPP_UPDATE_KEYWORD:
      return _extends({}, state, {
        keyword: action.keyword
      });
      break;
    case _commonOpportunity.COMMON_OPP_GET_INDUSTRY_TAG:
      return ReadIndustryTag(state, action) || state;
      break;
    case _commonOpportunity.COMMON_OPP_INIT_USER_WECHAT_INFO:
      return initUserWechatInfo(state, action) || state;
      break;
    case _commonOpportunity.COMMON_OPP_INIT_USER_PREFERENCE:
      return initUserPreferenceData(state, action) || state;
      break;
    case _commonOpportunity.COMMON_OPP_UPDATE_PREFERENCES:
      return updateUserPreference(state, action) || state;
      break;
    case _commonOpportunity.COMMON_OPP_UPDATE_CUSTOMIZE_STATUS:
      return _extends({}, state, {
        customizeStatus: action.customizeStatus
      });
      break;
    case _commonOpportunity.COMMON_OPP_UPDATE_ACCEPT_PUSH_STATUS:
      return updateUserAcceptPushStatus(state, action) || state;
      break;
    case _commonOpportunity.COMMON_OPP_UPDATE_ANIMATION_DURATION:
      return _extends({}, state, {
        animationDuration: action.duration
      });
      break;
    default:
      return state;
  }
};

function ReadIndustryTag(state, action) {
  if (action.stage === 'result') {
    return _extends({}, state, {
      industryTag: action.result
    });
  }
}

function initUserWechatInfo(state, action) {
  if (action.stage === 'result') {
    var _action$result$result = action.result.result,
        acceptPush = _action$result$result.acceptPush,
        subscribe = _action$result$result.subscribe;

    return _extends({}, state, {
      acceptPush: acceptPush,
      subscribe: subscribe
    });
  }
}

function initUserPreferenceData(state, action) {
  if (action.stage === 'result') {
    var isPreferenced = action.result.industries.length;
    return _extends({}, state, {
      isPreferenced: isPreferenced ? 1 : 0,
      customizeStatus: isPreferenced ? 'customized' : 'uncustomize',
      preferences: action.result
    });
  }
}

function updateUserPreference(state, action) {
  if (action.stage === 'start') {
    return _extends({}, state, {
      isPreferenced: 1,
      preferences: {
        industries: action.params.industries,
        positions: action.params.positions,
        locations: action.params.locations,
        stages: action.params.stages
      }
    });
  }
}

function updateUserAcceptPushStatus(state, action) {
  if (action.stage === 'result') {
    return _extends({}, state, {
      acceptPush: action.params.acceptPush
    });
  }
}