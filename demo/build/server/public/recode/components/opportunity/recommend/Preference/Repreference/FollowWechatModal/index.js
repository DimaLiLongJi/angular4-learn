'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _antd = require('antd');

var _commonOpportunity = require('../../../../../../actions/commonOpportunity');

var CommonOppActions = _interopRequireWildcard(_commonOpportunity);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// actions


var FollowWechatModal = function (_React$Component) {
  _inherits(FollowWechatModal, _React$Component);

  function FollowWechatModal(props) {
    _classCallCheck(this, FollowWechatModal);

    var _this = _possibleConstructorReturn(this, (FollowWechatModal.__proto__ || Object.getPrototypeOf(FollowWechatModal)).call(this, props));

    _this.updateUserSubscribeStatus = function () {
      var _p = _this.props;
      _this.setState({
        timer: setInterval(function () {
          _p.initUserWechatInfo({
            userId: _p.user.id
          });
          _this.setState({
            count: _this.state.count + 1
          });
          if (_this.state.count > 40) {
            clearInterval(_this.state.timer);
          }
        }, 1000)
      });
    };

    _this.handleCancel = function () {
      var _p = _this.props;
      _p.toggleFollowModal();
    };

    _this.clearCount = function () {
      clearInterval(_this.state.timer);
      _this.setState({
        count: 0
      });
    };

    _this.state = {
      timer: null,
      count: 0
    };
    return _this;
  }

  _createClass(FollowWechatModal, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_np) {
      var _p = this.props;
      if (_np.modalVisible !== _p.modalVisible && _np.modalVisible) {
        this.updateUserSubscribeStatus();
      }
      if (_np.user.subscribe && !_p.user.subscribe && _np.modalVisible) {
        clearInterval(this.state.timer);
        _p.toggleFollowModal();
        _p.updateUserAcceptPushStatus({
          acceptPush: 1
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var modalVisible = this.props.modalVisible;

      var tip = this.state.count > 40 && _react2.default.createElement(
        'p',
        { className: 'error-message' },
        '\u4E8C\u7EF4\u7801\u5DF2\u5931\u6548\uFF0C\u8BF7\u91CD\u65B0\u6253\u5F00\u5F39\u7A97'
      );
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _antd.Modal,
          {
            title: '\u626B\u7801\u5173\u6CE8\u5F00\u542F\u63A8\u9001',
            footer: null,
            visible: modalVisible,
            onCancel: this.handleCancel,
            afterClose: this.clearCount,
            wrapClassName: 'vertical-center-modal',
            className: 'follow-modal'
          },
          _react2.default.createElement(
            'div',
            { className: 'code-container' },
            _react2.default.createElement('img', { src: '/images/qr-code.jpg', alt: '\u626B\u7801\u767B\u5F55' })
          ),
          _react2.default.createElement(
            'h3',
            null,
            '\u5173\u6CE8\u670D\u52A1\u53F7\u6C42\u804C\u5B66\u5802\u5C0F\u52A9\u624B'
          ),
          _react2.default.createElement(
            'h3',
            null,
            '\u53EF\u5F00\u542F\u804C\u4F4D\u63A8\u9001'
          ),
          tip,
          _react2.default.createElement(
            'p',
            null,
            '\u82E5\u626B\u7801\u65E0\u53CD\u5E94\uFF0C\u8BF7\u5C1D\u8BD5\u6E05\u9664\u6D4F\u89C8\u5668\u7F13\u5B58\u6216\u4F7F\u7528\u5176\u4ED6\u6D4F\u89C8\u5668'
          )
        )
      );
    }
  }]);

  return FollowWechatModal;
}(_react2.default.Component);

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    initUserWechatInfo: function initUserWechatInfo(params) {
      dispatch(CommonOppActions.initUserWechatInfo(params));
    },
    updateUserAcceptPushStatus: function updateUserAcceptPushStatus(params) {
      dispatch(CommonOppActions.updateUserAcceptPushStatus(params));
    }
  };
};

exports.default = (0, _reactRedux.connect)(null, mapDispatchToProps)(FollowWechatModal);