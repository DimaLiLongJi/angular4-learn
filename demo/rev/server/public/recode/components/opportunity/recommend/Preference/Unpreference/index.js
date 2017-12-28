'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _commonOpportunity = require('../../../../../actions/commonOpportunity');

var CommonOppActions = _interopRequireWildcard(_commonOpportunity);

var _PreferenceModal = require('../PreferenceModal');

var _PreferenceModal2 = _interopRequireDefault(_PreferenceModal);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// actions


var Unreference = function (_React$Component) {
  _inherits(Unreference, _React$Component);

  function Unreference(props) {
    _classCallCheck(this, Unreference);

    var _this = _possibleConstructorReturn(this, (Unreference.__proto__ || Object.getPrototypeOf(Unreference)).call(this, props));

    _this.openModal = function () {
      var _p = _this.props;
      if (_p.user.id) {
        _this.togglePreferenceModal();
      } else {
        _this.context.openLoginModal({
          title: '扫码登录',
          qrcodeDescription: [_react2.default.createElement(
            'h3',
            { key: 1 },
            '\u5173\u6CE8\u670D\u52A1\u53F7\u6C42\u804C\u5B66\u5802\u5C0F\u52A9\u624B'
          ), _react2.default.createElement(
            'h3',
            { key: 2 },
            '\u53EF\u5F00\u542F\u804C\u4F4D\u63A8\u9001'
          )],
          qrcodeType: 1
        });
      }
    };

    _this.togglePreferenceModal = function () {
      _this.setState({
        preferenceModalVisible: !_this.state.preferenceModalVisible
      });
    };

    _this.state = {
      preferenceModalVisible: false
    };
    return _this;
  }

  _createClass(Unreference, [{
    key: 'render',
    value: function render() {
      var _p = this.props;
      var preferenceModalVisible = this.state.preferenceModalVisible;

      var user = _extends({}, _p.user, {
        subscribe: _p.userSubscribe,
        acceptPush: _p.userAcceptPush,
        isPreferenced: _p.userIsPreferenced,
        preferences: _p.userPreferences
      });
      return _react2.default.createElement(
        'div',
        { className: 'uncustomize-placeholder' },
        _react2.default.createElement(
          'p',
          { className: 'tips' },
          '\u53EA\u97004\u6B65\uFF0C\u5B9A\u5236\u4E13\u5C5E\u4F60\u7684\u804C\u4F4D\u548C\u95EE\u7B54'
        ),
        _react2.default.createElement(
          'p',
          { className: 'tips' },
          '\u5B8C\u5584\u4FE1\u606F\u540E\u53EF\u5F00\u542F\u804C\u4F4D\u63A8\u9001'
        ),
        _react2.default.createElement(
          'p',
          { className: 'tips' },
          '\u8BA9\u4F60\u7684\u6295\u9012\u6548\u7387\u7FFB\u500D'
        ),
        _react2.default.createElement(
          'a',
          { href: 'javascript:;', className: 'customized-btn', onClick: this.openModal },
          '\u5B8C\u5584\u5B9A\u5236\u4FE1\u606F'
        ),
        _react2.default.createElement(_PreferenceModal2.default, {
          setAnimationDuration: _p.setAnimationDuration,
          status: preferenceModalVisible,
          user: user,
          toggleModal: this.togglePreferenceModal })
      );
    }
  }]);

  return Unreference;
}(_react2.default.Component);

Unreference.propTypes = {};
Unreference.contextTypes = {
  openLoginModal: _propTypes2.default.func
};


var mapStateToProps = function mapStateToProps(state) {
  return {
    userIsPreferenced: state.commonOpp.isPreferenced,
    userPreferences: state.commonOpp.preferences,
    userAcceptPush: state.commonOpp.acceptPush,
    userSubscribe: state.commonOpp.subscribe,
    user: state.user
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, null)(Unreference);