'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _account = require('../actions/account');

var defaultData = {
  applicationList: {
    items: [],
    itemsPerPage: 10,
    pageNum: 1,
    totalItems: 0
  },
  totalCount: 0
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultData;
  var action = arguments[1];

  switch (action.type) {
    case _account.ACC_GET_APPLICATION:
      return handleGetList(state, action) || state;
      break;
    default:
      return state;
  }
};

function handleGetList(state, action) {
  if (action.stage === 'result') {
    var result = action.result;

    console.log('action.params==', action.params);
    return _extends({}, state, {
      applicationList: result,
      totalCount: action.params.checked !== 1 && action.params.checked !== 0 ? result.totalItems : state.totalCount
    });
  }
}