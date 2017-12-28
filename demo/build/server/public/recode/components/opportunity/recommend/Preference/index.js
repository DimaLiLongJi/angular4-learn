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

var _commonOpportunity = require('../../../../actions/commonOpportunity');

var CommonOppActions = _interopRequireWildcard(_commonOpportunity);

var _Repreference = require('./Repreference');

var _Repreference2 = _interopRequireDefault(_Repreference);

var _Unpreference = require('./Unpreference');

var _Unpreference2 = _interopRequireDefault(_Unpreference);

var _Preferencing = require('./Preferencing');

var _Preferencing2 = _interopRequireDefault(_Preferencing);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// actions

// components


var Preference = function (_React$Component) {
  _inherits(Preference, _React$Component);

  function Preference(props) {
    _classCallCheck(this, Preference);

    var _this = _possibleConstructorReturn(this, (Preference.__proto__ || Object.getPrototypeOf(Preference)).call(this, props));

    _this.initData = function (userId) {
      var _p = _this.props;
      _p.initUserPreference({
        userId: userId
      });
      _p.initUserWechatInfo({
        userId: userId
      });
    };

    _this.setAnimationDuration = function (duration) {
      _this.setState({
        animationDuration: duration
      });
    };

    _this.state = {
      animationDuration: 1
    };
    if (global.window && props.user.id) _this.initData(props.user.id);
    return _this;
  }

  _createClass(Preference, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(n) {
      if (n.user.id && !this.props.user.id) {
        this.initData(n.user.id);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _p = this.props;
      var _s = this.state;
      switch (_p.customizeStatus) {
        case 'uncustomize':
          return _react2.default.createElement(_Unpreference2.default, { setAnimationDuration: function setAnimationDuration(duration) {
              return _this2.setAnimationDuration(duration);
            } });
        case 'customizing':
          return _react2.default.createElement(_Preferencing2.default, { duration: _s.animationDuration });
        case 'customized':
          return _react2.default.createElement(_Repreference2.default, { setAnimationDuration: function setAnimationDuration(duration) {
              return _this2.setAnimationDuration(duration);
            } });
      }
    }
  }]);

  return Preference;
}(_react2.default.Component);

Preference.propTypes = {};


var mapStateToProps = function mapStateToProps(state) {
  return {
    customizeStatus: state.commonOpp.customizeStatus,
    user: state.user
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    initUserPreference: function initUserPreference(params) {
      dispatch(CommonOppActions.initUserPreference(params));
    },
    initUserWechatInfo: function initUserWechatInfo(params) {
      dispatch(CommonOppActions.initUserWechatInfo(params));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Preference);