'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactRedux = require('react-redux');

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _appPersist = require('./components/app-persist');

var _appPersist2 = _interopRequireDefault(_appPersist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import App from './components/app';


var AppRouter = function AppRouter() {
  return _react2.default.createElement(
    _reactRedux.Provider,
    { store: _store2.default },
    _react2.default.createElement(_appPersist2.default, null)
  );
};
// import 'antd/dist/antd.min.css';

(0, _reactDom.hydrate)(_react2.default.createElement(AppRouter, null), document.querySelector('#root'));