'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QaCard = function QaCard(props) {

  var favorite = props.favorite;
  if (!favorite || !favorite.question || !favorite.question.id) return '';

  var question = favorite.question;
  var answers = question.answers.map(function (a) {
    return _react2.default.createElement(
      'div',
      { key: a.id },
      _react2.default.createElement(
        'h4',
        null,
        '\u6C42\u804C\u5B66\u5802\u4E13\u4E1A\u56DE\u590D\uFF1A'
      ),
      _react2.default.createElement(
        'pre',
        { className: 'ng-binding' },
        a.content
      )
    );
  });
  var cancelBtn = _react2.default.createElement(
    'a',
    { href: 'javascript:;', className: 'favorite-btn', onClick: props.cancelFavorite.bind(undefined, favorite) },
    '\u53D6\u6D88\u6536\u85CF'
  );
  return _react2.default.createElement(
    'section',
    { className: 'account-favorite-question-detail' },
    _react2.default.createElement(
      'h3',
      null,
      _react2.default.createElement(
        'svg',
        { className: 'icon title', 'aria-hidden': 'true' },
        _react2.default.createElement('use', { xlinkHref: '#icon-wenti' })
      ),
      _react2.default.createElement(
        'span',
        null,
        question.title
      ),
      cancelBtn
    ),
    _react2.default.createElement(
      'p',
      null,
      _react2.default.createElement(
        'label',
        null,
        question.industry ? question.industry : ''
      ),
      _react2.default.createElement(
        'label',
        null,
        question.stage ? question.stage : ''
      )
    ),
    answers
  );
};

exports.default = QaCard;