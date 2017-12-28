'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _commonOpportunity = require('../../../../../../actions/commonOpportunity');

var CommonOppActions = _interopRequireWildcard(_commonOpportunity);

var _FollowWechatModal = require('../FollowWechatModal');

var _FollowWechatModal2 = _interopRequireDefault(_FollowWechatModal);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// actions


var CustomizeSwich = function (_React$Component) {
  _inherits(CustomizeSwich, _React$Component);

  function CustomizeSwich(props) {
    _classCallCheck(this, CustomizeSwich);

    var _this = _possibleConstructorReturn(this, (CustomizeSwich.__proto__ || Object.getPrototypeOf(CustomizeSwich)).call(this, props));

    _this.swich = function () {
      var _p = _this.props;
      var user = _p.user;

      if (user.acceptPush) {
        _p.updateUserAcceptPushStatus({
          acceptPush: !user.acceptPush
        });
        return;
      }
      if (!user.subscribe) {
        _this.toggleFollowModal();
      } else {
        _p.updateUserAcceptPushStatus({
          acceptPush: !user.acceptPush
        });
      }
    };

    _this.toggleFollowModal = function (visible) {
      _this.setState({
        followModalVisible: !_this.state.followModalVisible
      });
    };

    _this.state = {
      followModalVisible: false
    };
    return _this;
  }

  _createClass(CustomizeSwich, [{
    key: 'render',
    value: function render() {
      var followModalVisible = this.state.followModalVisible;
      var user = this.props.user;

      var checked = Boolean(user.acceptPush);
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'customize-switch' },
          _react2.default.createElement(
            'span',
            null,
            '\u5173'
          ),
          _react2.default.createElement(
            'label',
            { className: 'switch-wrap' },
            _react2.default.createElement('input', { type: 'checkbox', className: 'switch-btn green',
              checked: checked, onClick: this.swich,
              onChange: function onChange() {} }),
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement('div', null)
            )
          ),
          _react2.default.createElement(
            'span',
            null,
            '\u5F00'
          )
        ),
        _react2.default.createElement(_FollowWechatModal2.default, {
          user: user,
          modalVisible: followModalVisible,
          toggleFollowModal: this.toggleFollowModal
        })
      );
    }
  }]);

  return CustomizeSwich;
}(_react2.default.Component);

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    updateUserAcceptPushStatus: function updateUserAcceptPushStatus(params) {
      dispatch(CommonOppActions.updateUserAcceptPushStatus(params));
    }
  };
};

exports.default = (0, _reactRedux.connect)(null, mapDispatchToProps)(CustomizeSwich);