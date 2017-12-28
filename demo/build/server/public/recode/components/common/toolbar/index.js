'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _feedbackModule = require('./feedback-module');

var _feedbackModule2 = _interopRequireDefault(_feedbackModule);

var _ScrollToTop = require('../ScrollToTop');

var _ScrollToTop2 = _interopRequireDefault(_ScrollToTop);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FeedbackWidget = function (_Component) {
  _inherits(FeedbackWidget, _Component);

  function FeedbackWidget(props) {
    _classCallCheck(this, FeedbackWidget);

    var _this = _possibleConstructorReturn(this, (FeedbackWidget.__proto__ || Object.getPrototypeOf(FeedbackWidget)).call(this, props));

    _this.state = {
      isFeedbackModalOpen: false,
      visible: false
    };
    return _this;
  }

  _createClass(FeedbackWidget, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.location && nextProps.location.pathname) {
        if (nextProps.location.pathname.indexOf('/account') === 0 && this.state.visible) {
          this.setState({
            visible: false
          });
        }
        if (nextProps.location.pathname.indexOf('/account') !== 0 && !this.state.visible) {
          this.setState({
            visible: true
          });
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.state.visible) return null;
      return _react2.default.createElement(
        'div',
        { className: 'Toolbar' },
        _react2.default.createElement(_ScrollToTop2.default, null),
        _react2.default.createElement(_feedbackModule2.default, null),
        _react2.default.createElement(
          'div',
          { className: 'open-qrcode-btn' },
          _react2.default.createElement('a', { className: 'btn' }),
          _react2.default.createElement(
            'div',
            { className: 'qr-code-wrap' },
            _react2.default.createElement('img', { src: '/images/wechat-code-qiuzhixuetang.jpg', alt: '' })
          )
        )
      );
    }
  }]);

  return FeedbackWidget;
}(_react.Component);

exports.default = (0, _reactRouter.withRouter)(FeedbackWidget);