'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _feedbackModule = require('../../components/common/toolbar/feedback-module');

var _feedbackModule2 = _interopRequireDefault(_feedbackModule);

var _sideBar = require('./sideBar');

var _sideBar2 = _interopRequireDefault(_sideBar);

var _question = require('./question');

var _question2 = _interopRequireDefault(_question);

var _resume = require('./resume');

var _resume2 = _interopRequireDefault(_resume);

var _application = require('./application');

var _application2 = _interopRequireDefault(_application);

var _favorite = require('./favorite');

var _favorite2 = _interopRequireDefault(_favorite);

var _auth = require('../../actions/auth');

var _user = require('../../actions/user');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = function (_Component) {
  _inherits(Index, _Component);

  function Index(props) {
    _classCallCheck(this, Index);

    var _this = _possibleConstructorReturn(this, (Index.__proto__ || Object.getPrototypeOf(Index)).call(this, props));

    _this.renderSideBar = function () {
      return _react2.default.createElement(
        _reactRouterDom.Switch,
        null,
        _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/account/resume', render: function render() {
            return _react2.default.createElement(_sideBar2.default, { list: _this.state.sideBar, selected: 0 });
          } }),
        _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/account/application', render: function render() {
            return _react2.default.createElement(_sideBar2.default, { list: _this.state.sideBar, selected: 1 });
          } }),
        _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/account/question', render: function render() {
            return _react2.default.createElement(_sideBar2.default, { list: _this.state.sideBar, selected: 3 });
          } }),
        _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/account/favorite', render: function render() {
            return _react2.default.createElement(_sideBar2.default, { list: _this.state.sideBar, selected: 2 });
          } })
      );
    };

    _this.state = {
      sideBar: [{
        text: '我的简历',
        to: '/account/resume',
        icon: '#icon-icon-jianlicaozuo1'
      }, {
        text: '投递进程',
        to: '/account/application',
        icon: '#icon-icon-toudijincheng-'
      }, {
        text: '我的收藏',
        to: '/account/favorite',
        icon: '#icon-icon-shoucang-'
      }, {
        text: '我的问答',
        to: '/account/question',
        icon: '#icon-icon-tiwen-'
      }]
    };
    return _this;
  }

  _createClass(Index, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _p = this.props;
      _p.checkUserUnreadQuestion({ userId: _p.userId });
      _p.getUserInfo({ id: _p.userId });
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.props.userId) {
        this.props.history.push('/');
        (0, _auth.openLoginModal)();
      }
      return _react2.default.createElement(
        'div',
        { className: 'account-page' },
        _react2.default.createElement('div', { className: 'banner' }),
        _react2.default.createElement(
          'section',
          { className: 'account clearfix' },
          this.renderSideBar(),
          _react2.default.createElement(
            'main',
            { className: 'ng-scope' },
            _react2.default.createElement(
              'ui-view',
              null,
              _react2.default.createElement(
                _reactRouterDom.Switch,
                null,
                _react2.default.createElement(_reactRouterDom.Redirect, { exact: true, from: '/account', to: '/account/resume' }),
                _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/account/resume', render: function render() {
                    return _react2.default.createElement(_resume2.default, null);
                  } }),
                _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/account/application', render: function render() {
                    return _react2.default.createElement(_application2.default, null);
                  } }),
                _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/account/question', render: function render() {
                    return _react2.default.createElement(_question2.default, null);
                  } }),
                _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/account/favorite', render: function render() {
                    return _react2.default.createElement(_favorite2.default, null);
                  } })
              )
            )
          )
        ),
        _react2.default.createElement(_feedbackModule2.default, null)
      );
    }
  }]);

  return Index;
}(_react.Component);

var mapStoreToProps = function mapStoreToProps(store) {
  return {
    userId: store.user.id,
    answerChecked: store.user.answerChecked,
    applicationCheckedNotice: store.user.applicationCheckedNotice
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    checkUserUnreadQuestion: function checkUserUnreadQuestion(params) {
      dispatch((0, _user.getUserUnreadQuestion)(params));
    },
    getUserInfo: function getUserInfo(params) {
      dispatch((0, _user.getUserInfo)(params));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStoreToProps, mapDispatchToProps)(Index);