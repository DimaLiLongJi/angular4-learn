'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _antd = require('antd');

var _auth = require('../../../actions/auth');

var authActions = _interopRequireWildcard(_auth);

var _user = require('../../../actions/user');

var _constants = require('../../../constants');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoginModal = function (_React$Component) {
  _inherits(LoginModal, _React$Component);

  function LoginModal(props) {
    _classCallCheck(this, LoginModal);

    var _this = _possibleConstructorReturn(this, (LoginModal.__proto__ || Object.getPrototypeOf(LoginModal)).call(this, props));

    _this.stopCheck = function (notVisible) {
      // console.log('stopCheck');
      clearInterval(_this.state.intervalId);
      _this.setState({
        // codeInvalidated: true,
        checkLoginCount: 0,
        intervalId: 0
      });
    };

    _this.checkLogin = function () {
      _this.setState({
        imgUrl: _constants.LOGIN_QR_URL,
        codeInvalidated: false
      });
      if (_this.state.intervalId) return;
      var intervalId = setInterval(function () {
        if (_this.state.checkLoginCount >= 50) {
          _this.stopCheck();
        }
        _this.props.checkLogin(_this.state);
        _this.setState({
          checkLoginCount: _this.state.checkLoginCount + 1
        });
      }, 2000);
      _this.setState({
        intervalId: intervalId
      });
    };

    _this.state = {
      imgUrl: _constants.LOGIN_QR_URL,
      codeInvalidated: false,
      checkLoginCount: 0,
      intervalId: 0
    };
    return _this;
  }

  _createClass(LoginModal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.visible) {
        this.checkLogin();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.loginSuccess && !this.props.loginSuccess) {
        // this.props.getUserInfo();
        // window.location.reload(true);
        this.props.closeLoginModal();
      }

      if (nextProps.visible !== this.props.visible) {
        this.checkLogin();
      }
      if (!nextProps.visible) {
        this.stopCheck(1);
      }
      if (nextProps.loginSuccess) {
        this.stopCheck();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.stopCheck();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          visible = _props.visible,
          closeLoginModal = _props.closeLoginModal,
          width = _props.width,
          qrcodeDescription = _props.qrcodeDescription,
          qrcodeType = _props.qrcodeType,
          title = _props.title;

      if (!visible) return null;
      var content = _react2.default.createElement(
        'div',
        { className: 'login-modal' },
        _react2.default.createElement(
          'h1',
          null,
          title || '微信登录'
        ),
        _react2.default.createElement(
          'div',
          { className: 'code-container' },
          _react2.default.createElement('img', { src: qrcodeType ? 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=' + this.props.tempQrcodeTicket : this.state.imgUrl, alt: '' })
        ),
        _react2.default.createElement(
          'h3',
          null,
          '\u8BF7\u4F7F\u7528\u5FAE\u4FE1\u626B\u63CF\u4E8C\u7EF4\u7801'
        ),
        qrcodeDescription || _react2.default.createElement(
          'h3',
          null,
          '\u767B\u5F55\u201C\u6C42\u804C\u5B66\u5802\u201D'
        ),
        this.state.codeInvalidated && _react2.default.createElement(
          'p',
          { className: 'error-message' },
          '\u4E8C\u7EF4\u7801\u5DF2\u5931\u6548\uFF0C\u8BF7\u91CD\u65B0\u6253\u5F00\u5F39\u7A97'
        ),
        _react2.default.createElement(
          'p',
          null,
          '\u82E5\u626B\u7801\u65E0\u53CD\u5E94\uFF0C\u8BF7\u5C1D\u8BD5\u6E05\u9664\u6D4F\u89C8\u5668\u7F13\u5B58\u6216\u4F7F\u7528\u5176\u4ED6\u6D4F\u89C8\u5668'
        )
      );
      return _react2.default.createElement(
        _antd.Modal,
        {
          title: false,
          footer: false,
          visible: visible,
          onCancel: closeLoginModal,
          bodyStyle: { padding: 0, borderRadius: '6px', overflow: 'hidden' },
          width: width || 600
        },
        content
      );
    }
  }]);

  return LoginModal;
}(_react2.default.Component);

LoginModal.propTypes = {
  visible: _propTypes2.default.bool,
  loginSuccess: _propTypes2.default.bool,
  title: _propTypes2.default.string,
  closeLoginModal: _propTypes2.default.func,
  width: _propTypes2.default.number,
  qrcodeDescription: _propTypes2.default.array,
  qrcodeType: _propTypes2.default.number,
  checkLogin: _propTypes2.default.func
};


var mapStateToProps = function mapStateToProps(state) {
  return {
    loginSuccess: state.user.loginSuccess,
    echoStr: state.auth.echoStr,
    visible: state.auth.loginModalConfig && state.auth.loginModalConfig.visible,
    width: state.auth.loginModalConfig && state.auth.loginModalConfig.width,
    qrcodeDescription: state.auth.loginModalConfig && state.auth.loginModalConfig.qrcodeDescription,
    qrcodeType: state.auth.loginModalConfig && state.auth.loginModalConfig.qrcodeType,
    tempQrcodeTicket: state.auth.tempQrcodeTicket,
    title: state.auth.loginModalConfig && state.auth.loginModalConfig.title
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    checkLogin: function checkLogin() {
      dispatch((0, _user.checkLogin)());
    },
    closeLoginModal: function closeLoginModal() {
      dispatch(authActions.closeLoginModal());
    },
    getTempQrCodeTicket: function getTempQrCodeTicket() {
      dispatch(authActions.getTempQrCodeTicket());
    },
    getUserInfo: function getUserInfo() {
      dispatch((0, _user.getUserInfo)());
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(LoginModal);