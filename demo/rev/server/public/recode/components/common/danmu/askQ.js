'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _danmu = require('../../../actions/danmu');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AskQ = function (_Component) {
  _inherits(AskQ, _Component);

  function AskQ(props) {
    _classCallCheck(this, AskQ);

    var _this = _possibleConstructorReturn(this, (AskQ.__proto__ || Object.getPrototypeOf(AskQ)).call(this, props));

    _this.handleChange = function (val) {
      _this.setState({
        question: val
      });
    };

    _this.submitQuestion = function () {
      var params = {
        userId: _this.props.userId,
        title: _this.state.question
      };
      if (!params.title || params.title.length > 150) return;
      _this.props.submitQuestion(params);
      _this.props.hide();
    };

    _this.hide = function () {
      _this.props.saveInput(_this.state.question);
      _this.props.hide();
    };

    _this.keyDown = function (e) {
      if (e.keyCode === 13 && e.shiftKey === false) {
        _this.submitQuestion();
      }
    };

    _this.state = {
      question: _this.props.value || ''
    };
    return _this;
  }

  _createClass(AskQ, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _q = this.state.question;
      var len = _q.length;
      return _react2.default.createElement(
        'div',
        { className: 'ask-question clearfix', onBlur: function onBlur() {
            setTimeout(_this2.hide, 150);
          } },
        _react2.default.createElement('input', {
          id: 'ask-input',
          type: 'text',
          autoFocus: true,
          onKeyDown: this.keyDown,
          value: _q,
          onChange: function onChange(evt) {
            return _this2.handleChange(evt.target.value);
          },
          placeholder: '\u8BF7\u5728\u6B64\u8F93\u5165\u4F60\u7684\u95EE\u9898\u9650150\u5B57\u4EE5\u5185\uFF0C\u7B54\u6848\u5C06\u5728\u670D\u52A1\u53F7\uFF08\u6C42\u804C\u5B66\u5802\u5C0F\u52A9\u624B\uFF09\u5355\u72EC\u56DE\u590D\u4F60\uFF01'
        }),
        _react2.default.createElement(
          'strong',
          { className: 'limit-tip' },
          len,
          '/150'
        ),
        _react2.default.createElement(
          'a',
          { href: 'javascript:;', className: "send-btn " + (len > 150 ? 'disabled' : ''), onClick: this.submitQuestion },
          '\u53D1\u9001'
        )
      );
    }
  }]);

  return AskQ;
}(_react.Component);

var mapStoreToProps = function mapStoreToProps(store) {
  return {
    userId: store.user.id,
    value: store.danmu.danmuInput
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    submitQuestion: function submitQuestion(params) {
      dispatch((0, _danmu.submitQuestion)(params));
    },
    saveInput: function saveInput(params) {
      dispatch((0, _danmu.saveInput)(params));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStoreToProps, mapDispatchToProps)(AskQ);