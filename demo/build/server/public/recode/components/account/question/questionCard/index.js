'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var QuestionCard = function (_Component) {
  _inherits(QuestionCard, _Component);

  function QuestionCard() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, QuestionCard);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = QuestionCard.__proto__ || Object.getPrototypeOf(QuestionCard)).call.apply(_ref, [this].concat(args))), _this), _this.genAnswerContent = function () {
      var answers = void 0,
          noAnswer = void 0,
          hasAnswer = void 0;
      if (!_this.props.question) {
        return { answers: answers, noAnswer: noAnswer, hasAnswer: hasAnswer };
      }
      answers = _this.props.question.answers && _this.props.question.answers.map(function (a) {
        return _react2.default.createElement(
          'dl',
          { key: a.id, className: 'anwers-detail' },
          _react2.default.createElement(
            'dt',
            null,
            '\u6C42\u804C\u5B66\u5802\u4E13\u4E1A\u56DE\u590D\uFF1A',
            _react2.default.createElement(
              'span',
              null,
              '\u56DE\u7B54\u4E8E ',
              _react2.default.createElement(
                'i',
                null,
                (0, _moment2.default)(a.createdAt).format('YYYY-MM-DD')
              )
            )
          ),
          _react2.default.createElement(
            'dd',
            { className: 'answer' },
            _react2.default.createElement(
              'pre',
              null,
              a.content
            )
          )
        );
      });
      noAnswer = _react2.default.createElement(
        'p',
        { className: 'no-answer' },
        _react2.default.createElement(
          'span',
          { className: 'tag' },
          '\u672A\u56DE\u7B54'
        ),
        '\xA0\xA0',
        _react2.default.createElement(
          'i',
          null,
          '\u63D0\u95EE\u4E8E'
        ),
        '\xA0\xA0',
        (0, _moment2.default)(_this.props.question.createdAt).format('YYYY-MM-DD')
      );
      hasAnswer = _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'has-anwers' },
          _react2.default.createElement(
            'p',
            null,
            _react2.default.createElement(
              'span',
              { className: 'lable' },
              _this.props.question.industry && _this.props.question.industry.name
            ),
            _react2.default.createElement(
              'span',
              { className: 'lable' },
              _this.props.question.stage && _this.props.question.industry.name
            )
          ),
          _react2.default.createElement(
            'p',
            { className: 'no-answer' },
            _react2.default.createElement(
              'span',
              { className: 'tag' },
              '\u5DF2\u56DE\u7B54'
            ),
            '\xA0\xA0',
            _react2.default.createElement(
              'i',
              null,
              '\u63D0\u95EE\u4E8E'
            ),
            '\xA0\xA0',
            (0, _moment2.default)(_this.props.question.createdAt).format('YYYY-MM-DD')
          )
        ),
        _react2.default.createElement(
          'p',
          { className: 'count' },
          '\u76EE\u524D\u5171 ',
          _react2.default.createElement(
            'span',
            null,
            _this.props.question.answers.length
          ),
          ' \u4E2A\u56DE\u7B54'
        )
      );
      return { answers: answers, noAnswer: noAnswer, hasAnswer: hasAnswer };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(QuestionCard, [{
    key: 'render',
    value: function render() {
      if (!this.props.question) {
        return '';
      }
      var content = this.genAnswerContent();

      return _react2.default.createElement(
        'div',
        { className: 'account-qa-question-detail' },
        _react2.default.createElement(
          'h3',
          null,
          _react2.default.createElement(
            'svg',
            { className: 'icon title', 'aria-hidden': 'true' },
            _react2.default.createElement('use', { xlinkHref: '#icon-wenti' })
          ),
          this.props.question.title
        ),
        !this.props.question.answers.length ? content.noAnswer : content.hasAnswer,
        content.answers
      );
    }
  }]);

  return QuestionCard;
}(_react.Component);

QuestionCard.propTypes = {
  question: _propTypes2.default.object
};
exports.default = QuestionCard;