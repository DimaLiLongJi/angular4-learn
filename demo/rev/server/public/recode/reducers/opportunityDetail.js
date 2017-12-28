'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _opportunityDetail = require('../actions/opportunityDetail');

var defaultData = {
  opp: {},
  resumes: [],
  prefixs: [],
  available: false,
  applyInfo: {
    title: '',
    attachmentIds: [],
    prefixId: 1,
    mobile: '',
    email: '',
    opportunityId: 0,
    userId: 0,
    createdBy: 0
  }
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultData;
  var action = arguments[1];

  switch (action.type) {
    case _opportunityDetail.OPP_DETIAL_GET_DETIAL:
      return updateOppDetail(state, action) || state;
      break;
    case _opportunityDetail.OPP_DETIAL_GET_RESUME:
      return updateReusmeData(state, action) || state;
      break;
    case _opportunityDetail.OPP_DETIAL_GET_MOBILE_PREFIX:
      return updatePrefixData(state, action) || state;
      break;
    case _opportunityDetail.OPP_DETIAL_GET_LAST_APPLY_INFO:
      return updateLastestApplyData(state, action) || state;
      break;
    case _opportunityDetail.OPP_DETIAL_CHECK_AVAILABLE:
      return updateOppAivilable(state, action) || state;
      break;
    case _opportunityDetail.OPP_DETIAL_UPDATE_APPLY_INFO:
      {
        console.log('action.result', action.result);
        return _extends({}, state, {
          applyInfo: _extends({}, state.applyInfo, action.result)
        });
      }
      break;
    case _opportunityDetail.OPP_DETIAL_APPLY:
      return applyOpp(state, action) || state;
      break;
    case _opportunityDetail.OPP_DETIAL_DELETE_RESUME:
      return updateAttachmentData(state, action) || state;
      break;
    case _opportunityDetail.OPP_DETIAL_SAVE_RESUME:
      return handleSaveResume(state, action) || state;
      break;
    case _opportunityDetail.OPP_DETIAL_FAVORITE:
      return updateFavorite(state, action) || state;
      break;
    default:
      return state;
  }
};

function updateOppDetail(state, action) {
  if (action.stage === 'result') {
    return _extends({}, state, {
      opp: _extends({}, action.result)
    });
  }
}

function updateReusmeData(state, action) {
  if (action.stage === 'result') {
    return _extends({}, state, {
      resumes: action.result
    });
  }
}

function updatePrefixData(state, action) {
  if (action.stage === 'result') {
    return _extends({}, state, {
      prefixs: action.result
    });
  }
}

function updateLastestApplyData(state, action) {
  if (action.stage === 'result') {
    var result = action.result;
    return _extends({}, state, {
      applyInfo: _extends({}, state.applyInfo, {
        attachmentIds: result.attachmentIds,
        attachmentId: result.attachmentId,
        mobile: result.mobile,
        email: result.email,
        title: result.title,
        prefixId: result.prefixId
      })
    });
  }
}

function updateOppAivilable(state, action) {
  if (action.stage === 'result') {
    return _extends({}, state, {
      available: action.result.available
    });
  }
}

function applyOpp(state, action) {
  if (action.stage === 'result') {
    return _extends({}, state, {
      available: false
    });
  }
}

function handleSaveResume(state, action) {
  if (action.stage === 'result') {
    var resumes = [].concat(state.resumes);
    resumes.push(action.result);
    return _extends({}, state, {
      resumes: resumes
    });
  }
  return state;
}

function updateAttachmentData(state, action) {
  var resumes = state.resumes.filter(function (r) {
    return r.id !== action.params.attachmentId;
  });
  if (action.stage === 'result') {
    return _extends({}, state, {
      applyInfo: _extends({}, state.applyInfo, {
        attachmentIds: state.applyInfo.attachmentIds.filter(function (r) {
          return r.id !== action.params.attachmentId;
        })
      }),
      resumes: resumes
    });
  }
}

function updateFavorite(state, action) {
  if (action.stage === 'result') {
    return _extends({}, state, {
      opp: _extends({}, state.opp, {
        isFavorite: !state.opp.isFavorite
      })
    });
  }
}