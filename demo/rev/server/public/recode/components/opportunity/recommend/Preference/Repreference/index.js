'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _antd = require('antd');

var _commonOpportunity = require('../../../../../actions/commonOpportunity');

var CommonOppActions = _interopRequireWildcard(_commonOpportunity);

var _PreferenceModal = require('../PreferenceModal');

var _PreferenceModal2 = _interopRequireDefault(_PreferenceModal);

var _CustomizeSwich = require('./CustomizeSwich');

var _CustomizeSwich2 = _interopRequireDefault(_CustomizeSwich);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// actions

// components


var RePreference = function (_React$Component) {
  _inherits(RePreference, _React$Component);

  function RePreference(props) {
    _classCallCheck(this, RePreference);

    var _this = _possibleConstructorReturn(this, (RePreference.__proto__ || Object.getPrototypeOf(RePreference)).call(this, props));

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

  _createClass(RePreference, [{
    key: 'render',
    value: function render() {
      var _p = this.props;
      var user = _extends({}, _p.user, {
        subscribe: _p.userSubscribe,
        acceptPush: _p.userAcceptPush,
        isPreferenced: _p.userIsPreferenced,
        preferences: _p.userPreferences
      });
      var preferenceModalVisible = this.state.preferenceModalVisible;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h1',
          { className: 'revise-customization' },
          _react2.default.createElement(
            'p',
            null,
            _react2.default.createElement(
              'svg',
              { className: 'icon', 'aria-hidden': 'true' },
              _react2.default.createElement('use', { xlinkHref: '#icon-xiaochatu-' })
            ),
            '\u63A8\u8350\u804C\u4F4D\u57FA\u4E8E\u4F60\u586B\u5199\u7684\u5B9A\u5236\u4FE1\u606F\u7ED9\u51FA'
          ),
          _react2.default.createElement(
            _antd.Button,
            { type: 'primary', onClick: this.togglePreferenceModal, className: 'revise-btn' },
            '\u4FEE\u6539\u5B9A\u5236\u4FE1\u606F'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'push-bar' },
          _react2.default.createElement(
            'p',
            null,
            '\u6C42\u804C\u5B66\u5802\u5C0F\u52A9\u624B\u670D\u52A1\u53F7\u6BCF\u5929\u5317\u4EAC\u65F6\u95F4\u65E9\u4E0A9\u70B9\uFF0C\u5C06\u6839\u636E\u4F60\u5B8C\u5584\u7684\u5B9A\u5236\u4FE1\u606F\u63A8\u9001\u6700\u65B0\u7684\u5B9E\u4E60\u804C\u4F4D'
          ),
          _react2.default.createElement(_CustomizeSwich2.default, { user: user })
        ),
        _react2.default.createElement(_PreferenceModal2.default, {
          setAnimationDuration: _p.setAnimationDuration,
          status: preferenceModalVisible,
          user: user,
          toggleModal: this.togglePreferenceModal })
      );
    }
  }]);

  return RePreference;
}(_react2.default.Component);

RePreference.propTypes = {
  params: _propTypes2.default.object,
  customizingInfo: _propTypes2.default.func,
  toggleModal: _propTypes2.default.func
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

exports.default = (0, _reactRedux.connect)(mapStateToProps, null)(RePreference);