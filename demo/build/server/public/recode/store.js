'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storage = exports.persistor = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reduxPersist = require('redux-persist');

var _storage = require('redux-persist/es/storage');

var _storage2 = _interopRequireDefault(_storage);

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _fetchMiddleware = require('./utils/fetchMiddleware');

var _fetchMiddleware2 = _interopRequireDefault(_fetchMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
// const config = {
//   key: 'college-root',
//   storage,
// };

Object.keys(_reducers.persisted).forEach(function (k) {
  var r = _reducers.persisted[k];
  _reducers.persisted[k] = (0, _reduxPersist.persistReducer)({
    // debug: true,
    key: 'college_reducer_' + k,
    storage: _storage2.default,
    blacklist: ['subscription', 'newQuestionArray'],
    serialize: true
  }, r);
});

var reducer = _extends({}, _reducers2.default, _reducers.persisted);

console.log('reducerreducer', reducer);

var middlewares = [_fetchMiddleware2.default, _reduxThunk2.default];

var storeEnhancers = (0, _redux.compose)(_redux.applyMiddleware.apply(undefined, middlewares), window && window.devToolsExtension ? window.devToolsExtension() : function (f) {
  return f;
});

// const reducer = combineReducers(reducers)
var store = (0, _redux.createStore)((0, _redux.combineReducers)(reducer), window.__INITIAL_STATE__, storeEnhancers);

// export const initialState = reducer(undefined, { type: 'noop' });

var persistor = exports.persistor = (0, _reduxPersist.persistStore)(store);

exports.storage = _storage2.default;
exports.default = store;