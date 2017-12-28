'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactRouterDom = require('react-router-dom');

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _commonOpportunity = require('../../actions/commonOpportunity');

var CommonOppActions = _interopRequireWildcard(_commonOpportunity);

var _all = require('./all');

var _all2 = _interopRequireDefault(_all);

var _recommend = require('./recommend');

var _recommend2 = _interopRequireDefault(_recommend);

var _SubNav = require('./common/SubNav');

var _SubNav2 = _interopRequireDefault(_SubNav);

var _OppCount = require('./common/OppCount');

var _OppCount2 = _interopRequireDefault(_OppCount);

var _Search = require('./common/Search');

var _Search2 = _interopRequireDefault(_Search);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// actions

// components


var Index = function (_Component) {
  _inherits(Index, _Component);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.typeKeyword = function (keyword) {
      _this.props.updateKeyword(keyword);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          user = _props.user,
          initUserPreference = _props.initUserPreference;

      if (user.id) {
        initUserPreference({
          userId: user.id
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _p = this.props;
      var redirect = void 0;

      if (_p.user.id && _p.userIsPreferenced) {
        redirect = _react2.default.createElement(_reactRouterDom.Redirect, { exact: true, from: '/opportunity', to: '/opportunity/recommend' });
      } else {
        redirect = _react2.default.createElement(_reactRouterDom.Redirect, { exact: true, from: '/opportunity', to: '/opportunity/all' });
      }
      if (_p.userIsPreferenced === undefined) {
        redirect = false;
      }
      if (!_p.user.id) {
        redirect = _react2.default.createElement(_reactRouterDom.Redirect, { exact: true, from: '/opportunity', to: '/opportunity/all' });
      }
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _reactHelmet2.default,
          null,
          _react2.default.createElement(
            'title',
            null,
            '\u6C42\u804C\u5B66\u5802,\u6559\u4F60\u5982\u4F55\u62FFOffer | \u804C\u4E1A\u86D9'
          ),
          _react2.default.createElement('meta', { name: 'description', content: '\u6C42\u804C\u5B66\u5802,\u804C\u4E1A\u86D9\u7CBE\u5FC3\u6253\u9020\u7684\u6C42\u804C\u5E72\u8D27\u5206\u4EAB\u5E73\u53F0\u3002\u8FD9\u91CC\u6709\u514D\u8D39\u7684\u6C42\u804C\u7ECF\u9A8C\u5206\u4EAB,\u4E30\u5BCC\u7684\u5B9E\u4E60\u62DB\u8058\u4FE1\u606F\u548C\u516C\u53F8\u4ECB\u7ECD\uFF1B\u901A\u8FC7\u5927\u6570\u636E\u5206\u6790\u8BC4\u4F30\u5B66\u751F\u7684\u6C42\u804C\u7ADE\u4E89\u529B,\u5E76\u63D0\u4F9B\u4E00\u7AD9\u5F0F\u6C42\u804C\u89E3\u51B3\u65B9\u6848' }),
          _react2.default.createElement('meta', { name: 'keywords', content: '\u6C42\u804C\u5B66\u5802,\u804C\u4E1A\u86D9,\u5B9E\u4E60,\u6821\u62DB ,\u516C\u53F8,\u54A8\u8BE2,\u91D1\u878D, \u4E92\u8054\u7F51,\u6D77\u5F52,\u5E94\u5C4A\u751F,\u4EB2\u5386\u8005\u8BF4, \u7ECF\u9A8C\u5206\u4EAB,\u6C42\u804C\u5E72\u8D27,\u5927\u5B66\u751F\u6C42\u804C\u7ADE\u4E89\u529B\u6D4B\u8BC4,\u6C42\u804C\u670D\u52A1' })
        ),
        _react2.default.createElement(
          'div',
          { className: 'page-container opportunity-list-page' },
          _react2.default.createElement(
            'div',
            { className: 'search-count' },
            _react2.default.createElement(_OppCount2.default, null),
            _react2.default.createElement(_Search2.default, { typeKeyword: this.typeKeyword, value: this.props.keyword })
          ),
          _react2.default.createElement(_SubNav2.default, null),
          _react2.default.createElement(
            _reactRouterDom.Switch,
            null,
            redirect,
            _react2.default.createElement(_reactRouterDom.Route, { path: '/opportunity/all', render: function render() {
                return _react2.default.createElement(_all2.default, null);
              } }),
            _react2.default.createElement(_reactRouterDom.Route, { path: '/opportunity/recommend', render: function render() {
                return _react2.default.createElement(_recommend2.default, null);
              } })
          )
        )
      );
    }
  }], [{
    key: 'fetchData',
    value: function fetchData(store, params) {
      var userId = store.getState().user.id;
      if (!userId) return;
      return store.dispatch(CommonOppActions.initUserPreference({ userId: userId }));
    }
  }]);

  return Index;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    user: state.user,
    userIsPreferenced: state.commonOpp.isPreferenced,
    keyword: state.commonOpp.keyword
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    initUserPreference: function initUserPreference(params) {
      dispatch(CommonOppActions.initUserPreference(params));
    },
    updateKeyword: function updateKeyword(params) {
      dispatch(CommonOppActions.updateKeyword(params));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Index);