'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

var _userFavorite = require('../actions/userFavorite');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var defaultData = {
  favoriteList: {}
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultData;
  var action = arguments[1];

  switch (action.type) {
    case _userFavorite.USER_GET_FAVORITES_LIST:
      return getUserFavorites(state, action) || state;
    case _userFavorite.USER_DEL_FAVORITE:
      return deleteUserFavorite(state, action);
    default:
      return state;
  }
};

function getUserFavorites(state, action) {
  if (action.stage === 'result') {
    return _extends({}, state, {
      favoriteList: action.result
    });
  }
}

function deleteUserFavorite(state, action) {
  if (action.stage === 'result') {
    var favList = Object.assign({}, state.favoriteList);
    favList.refresh = 1;
    if (action.result.result) {
      _.remove(favList.favorites, function (fav) {
        if (action.params.entityType === 'opportunity') {
          return fav.opportunity.id === action.params.entityId;
        } else {
          return fav.question.id === action.params.entityId;
        }
      });
    }
    return _extends({}, state, {
      favoriteList: favList
    });
  }
}