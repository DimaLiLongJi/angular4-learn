'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reducers = require('../../../public/recode/reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _common = require('../../../public/recode/actions/common');

var _middlewares = require('./middlewares');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const reducer = (0, _redux.combineReducers)(_reducers2.default);

module.exports = (req, RouterPath) => {
  const store = (0, _redux.createStore)(reducer, (0, _redux.applyMiddleware)(_reduxThunk2.default));
  store.dispatch((0, _common.InitPath)(RouterPath));

  store.dispatch({
    type: 'USER_LOAD',
    user: req.user || {}
  });
  (0, _middlewares.Constants)(store);
  return store;
};