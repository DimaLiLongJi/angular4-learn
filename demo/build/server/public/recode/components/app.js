'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _reactRouterDom = require('react-router-dom');

var _reactRouterConfig = require('react-router-config');

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _Header = require('./common/Header');

var _Header2 = _interopRequireDefault(_Header);

var _BannerPage = require('./common/Banner-page');

var _BannerPage2 = _interopRequireDefault(_BannerPage);

var _PageFooter = require('./common/PageFooter');

var _PageFooter2 = _interopRequireDefault(_PageFooter);

var _loginModal = require('./common/login-modal');

var _loginModal2 = _interopRequireDefault(_loginModal);

var _user = require('../actions/user');

var userActions = _interopRequireWildcard(_user);

var _auth = require('../actions/auth');

var _toolbar = require('./common/toolbar');

var _toolbar2 = _interopRequireDefault(_toolbar);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        openLoginModal: this.props.openLoginModal,
        config: this.props.config
      };
    }
  }, {
    key: 'render',
    value: function render() {
      // asdasd;
      return _react2.default.createElement(
        'div',
        { className: 'app' },
        _react2.default.createElement(
          _reactRouterDom.BrowserRouter,
          { basename: '/pc' },
          _react2.default.createElement(
            'div',
            { className: 'body-content' },
            _react2.default.createElement(_Header2.default, null),
            _react2.default.createElement(_BannerPage2.default, null),
            (0, _reactRouterConfig.renderRoutes)(_routes2.default),
            _react2.default.createElement(_toolbar2.default, null)
          )
        ),
        _react2.default.createElement(_PageFooter2.default, null),
        _react2.default.createElement(_loginModal2.default, null)
      );
    }
  }]);

  return App;
}(_react2.default.Component);

// export default

App.childContextTypes = {
  openLoginModal: _propTypes.PropTypes.func,
  config: _propTypes.PropTypes.object
};
var mapStateToProps = function mapStateToProps(state) {
  return {
    user: state.user,
    config: state.config
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    loadUser: function loadUser(user) {
      dispatch(userActions.loadUser(user));
    },
    updatePreferences: function updatePreferences(params) {
      dispatch(userActions.updatePreferences(params));
    },
    openLoginModal: function openLoginModal(params) {
      dispatch((0, _auth.openLoginModal)(params));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(App);