'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _Banner = require('../Banner');

var _Banner2 = _interopRequireDefault(_Banner);

var _danmu = require('../danmu');

var _danmu2 = _interopRequireDefault(_danmu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BannerPage = function (_React$Component) {
  _inherits(BannerPage, _React$Component);

  function BannerPage(props) {
    _classCallCheck(this, BannerPage);

    var _this = _possibleConstructorReturn(this, (BannerPage.__proto__ || Object.getPrototypeOf(BannerPage)).call(this, props));

    var state = {
      showDanmu: false,
      pageName: ''
    };
    if (_this.props.initPath) {
      state = _extends({}, state, _this.dealShowDanmu(_this.props.initPath));
    }
    _this.state = state;
    return _this;
  }

  _createClass(BannerPage, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (!global.window) return;
      this.setState(_extends({}, this.dealShowDanmu(window.location.href.split('/pc')[1])));
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.location && nextProps.location.pathname) {
        this.setState(_extends({}, this.dealShowDanmu(nextProps.location.pathname)));
        return true;
      }
      return false;
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return nextState.pageName !== this.state.pageName || nextProps.danmuOn !== this.props.danmuOn;
    }
  }, {
    key: 'dealShowDanmu',
    value: function dealShowDanmu(pathName) {
      if (!pathName) return {};
      if (/^\/discovery(\?|$)/.test(pathName)) {
        return {
          pageName: 'discovery-page',
          showDanmu: true
        };
      } else if (/^\/opportunity(\/|$)/.test(pathName)) {
        return {
          pageName: 'opportunity-page',
          showDanmu: true
        };
      } else if (/^\/recruit_calendar(\/|$)/.test(pathName)) {
        return {
          pageName: 'recruit-calendar-page',
          showDanmu: true
        };
      } else {
        return {
          pageName: '',
          showDanmu: false
        };
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        this.state.showDanmu && this.props.danmuOn && _react2.default.createElement(_danmu2.default, null),
        this.state.pageName && _react2.default.createElement(_Banner2.default, { pageName: this.state.pageName })
      );
    }
  }]);

  return BannerPage;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    danmuOn: state.danmu.danmuOn,
    initPath: state.common.initPath
  };
};

exports.default = (0, _reactRouter.withRouter)((0, _reactRedux.connect)(mapStateToProps)(BannerPage));