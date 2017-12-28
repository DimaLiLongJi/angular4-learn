'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _reactRedux = require('react-redux');

var _recruitCalendar = require('../../actions/recruitCalendar');

var _all = require('./all');

var _all2 = _interopRequireDefault(_all);

var _countdown = require('./countdown');

var _countdown2 = _interopRequireDefault(_countdown);

var _SubNav = require('./common/SubNav');

var _SubNav2 = _interopRequireDefault(_SubNav);

var _searchKeyword = require('./common/searchKeyword');

var _searchKeyword2 = _interopRequireDefault(_searchKeyword);

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RecruitCalendar = function (_React$Component) {
  _inherits(RecruitCalendar, _React$Component);

  function RecruitCalendar(props) {
    _classCallCheck(this, RecruitCalendar);

    var _this = _possibleConstructorReturn(this, (RecruitCalendar.__proto__ || Object.getPrototypeOf(RecruitCalendar)).call(this, props));

    if (!_this.props.industries.length) _this.props.getStatistics();
    return _this;
  }

  _createClass(RecruitCalendar, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'body-content RecruitCalendar' },
        _react2.default.createElement(
          _reactHelmet2.default,
          null,
          _react2.default.createElement(
            'title',
            null,
            '\u6821\u62DB\u65E5\u5386_\u6C42\u804C\u5B66\u5802_\u804C\u4E1A\u86D9'
          ),
          _react2.default.createElement('meta', { name: 'description', content: '\u63D0\u4F9B\u6700\u5177\u53C2\u8003\u529B\u7684\u6821\u62DB\u65F6\u95F4\u4FE1\u606F,\u516C\u53F8\u6821\u62DB\u9884\u6D4B\u62A2\u5148\u770B' }),
          _react2.default.createElement('meta', { name: 'keywords', content: '\u6821\u62DB\u65E5\u5386,\u6821\u62DB\u65F6\u95F4,\u5E94\u5C4A\u79CB\u62DB,\u5E94\u5C4A\u751F,18\u5C4A\u79CB\u62DB,500\u5F3A,\u540D\u4F01,\u6821\u62DB\u9884\u6D4B,\u79CB\u62DB\u9884\u6D4B' })
        ),
        _react2.default.createElement(_searchKeyword2.default, null),
        _react2.default.createElement(_SubNav2.default, null),
        _react2.default.createElement(
          _reactRouterDom.Switch,
          null,
          _react2.default.createElement(_reactRouterDom.Redirect, { exact: true, from: '/recruit_calendar', to: '/recruit_calendar/countdown' }),
          _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/recruit_calendar/all', component: _all2.default }),
          _react2.default.createElement(_reactRouterDom.Route, { path: '/recruit_calendar/countdown', component: _countdown2.default })
        )
      );
    }
  }]);

  return RecruitCalendar;
}(_react2.default.Component);

var mapStoreToProps = function mapStoreToProps(store) {
  return {
    industries: store.recruitCalendar.industries
  };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    getStatistics: function getStatistics(params) {
      dispatch((0, _recruitCalendar.getStatistics)(params));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStoreToProps, mapDispatchToProps)(RecruitCalendar);