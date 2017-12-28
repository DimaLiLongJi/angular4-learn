'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _recruitCalendar = require('../actions/recruitCalendar');

var defaultData = {
  companyList: {},
  companyListSearch: {},
  listParams: {
    applyStart: '2017-12',
    applyStatus: undefined,
    industryId: undefined,
    pageNum: 1,
    itemsPerPage: 10
  },
  listSearchParams: {
    keyword: '',
    pageNum: 1,
    itemsPerPage: 12
  },
  industries: [],
  dates: [],
  searchKeyword: '',
  countdownParams: {
    keyword: '',
    industryId: undefined,
    pageNum: 1,
    itemsPerPage: 10
  },
  countdownList: {},
  countdownSearchParams: {
    keyword: '',
    pageNum: 1,
    itemsPerPage: 10
  },
  countdownSearchList: {}
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultData;
  var action = arguments[1];

  switch (action.type) {
    case _recruitCalendar.RECALD_GET_STATISTICS:
      return handleStatistics(state, action) || state;
      break;
    case _recruitCalendar.RECALD_GET_COMPANY_LIST:
      return handleCompanyList(state, action) || state;
      break;
    case _recruitCalendar.RECALD_GET_COUNTDOWN_LIST:
      return handleCountdownList(state, action) || state;
      break;
    case _recruitCalendar.RECALD_KEYWORD_UPDATE:
      return _extends({}, state, {
        searchKeyword: action.keyword
      });
      break;
    default:
      return state;
  }
};

function handleStatistics(state, action) {
  if (action.stage === 'result') {
    var result = action.result;

    return _extends({}, state, {
      industries: result.byIndustry,
      dates: result.byDate
    });
  }
}

function handleCountdownList(state, action) {
  if (action.stage === 'start') {
    if (action.params.keyword) {
      return _extends({}, state, {
        countdownSearchParams: action.params
      });
    }
    return _extends({}, state, {
      countdownParams: action.params
    });
  }
  if (action.stage === 'result') {
    var params = action.params,
        result = action.result;

    result.pageNum = Number(result.pageNum);
    result.itemsPerPage = Number(result.itemsPerPage);
    result.totalItems = Number(result.totalItems);
    if (params.keyword) {
      return _extends({}, state, {
        countdownSearchList: result
      });
    }
    return _extends({}, state, {
      countdownList: result
    });
  }
}

function handleCompanyList(state, action) {
  // console.log('handleList');
  if (action.stage === 'start') {
    if (action.params.keyword) {
      return _extends({}, state, {
        listSearchParams: action.params
      });
    }
    return _extends({}, state, {
      listParams: action.params
    });
  }
  if (action.stage === 'result') {
    var params = action.params,
        result = action.result;

    if (params.keyword) {
      return _extends({}, state, {
        companyListSearch: result
      });
    }
    return _extends({}, state, {
      companyList: result
    });
  }
}