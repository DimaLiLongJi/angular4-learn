'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _react3 = require('redux-persist/es/integration/react');

var _store = require('../store');

var _store2 = _interopRequireDefault(_store);

var _common = require('../actions/common');

var _errorPage = require('./common/errorPage');

var _errorPage2 = _interopRequireDefault(_errorPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.logout = function () {
      _store.persistor.purge().then(function () {
        window.location = '/api/auth/logout';
      });
    };

    _this.flush = function () {
      _store.persistor.flush();
    };

    _this.state = { hasError: false };
    return _this;
  }

  _createClass(App, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        logout: this.logout,
        flush: this.flush
      };
    }
  }, {
    key: 'componentDidCatch',
    value: function componentDidCatch(error, info) {
      // console.log(error, info);
      this.setState({
        hasError: true,
        error: error,
        info: info
      });
      var data = _store2.default.getState();
      delete data.danmu;

      if (!/^test/.test(window.location.host)) {
        (0, _common.uiError)({
          info: JSON.stringify(info),
          location: window.location.pathname,
          error: JSON.stringify({
            name: error.name,
            message: error.message,
            stack: error.stack
          }),
          data: JSON.stringify(data)
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.state.hasError) return _react2.default.createElement(_errorPage2.default, { error: this.state.error, info: this.state.info });
      return _react2.default.createElement(
        _react3.PersistGate,
        { persistor: _store.persistor },
        _react2.default.createElement(_app2.default, null)
      );
    }
  }]);

  return App;
}(_react2.default.Component);

App.childContextTypes = {
  logout: _propTypes2.default.func,
  flush: _propTypes2.default.func
};
exports.default = App;