'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QaCard = function QaCard(props) {
  var _p = props;
  if (!_p.question) return '';
  var question = _p.question;
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
        null,
        a.content
      )
    );
  });
  var favoriteBtn = question.isFavorite ? _react2.default.createElement(
    'a',
    { href: 'javascript:;', onClick: _p.favoriteToggle.bind(undefined, question), className: 'favorite-btn favorited' },
    _react2.default.createElement(
      'svg',
      { className: 'icon', 'aria-hidden': 'true' },
      _react2.default.createElement('use', { xlinkHref: '#icon-icon-shoucangshixin-' })
    ),
    '\u5DF2\u6536\u85CF'
  ) : _react2.default.createElement(
    'a',
    { href: 'javascript:;', onClick: _p.favoriteToggle.bind(undefined, question), className: 'favorite-btn' },
    _react2.default.createElement(
      'svg',
      { className: 'icon', 'aria-hidden': 'true' },
      _react2.default.createElement('use', { xlinkHref: '#icon-icon-shoucang-' })
    ),
    '\u6536\u85CF'
  );

  return _react2.default.createElement(
    'section',
    { className: '' },
    _react2.default.createElement(
      'div',
      { className: 'common-question-detail' },
      _react2.default.createElement(
        'h3',
        null,
        _react2.default.createElement('i', { className: 'iconfont icon-wenti' }),
        _react2.default.createElement(
          'span',
          null,
          question.title
        ),
        favoriteBtn
      ),
      _react2.default.createElement(
        'p',
        null,
        _react2.default.createElement(
          'label',
          null,
          question.industry && question.industry.name
        ),
        _react2.default.createElement(
          'label',
          null,
          question.stage && question.stage.name
        ),
        _react2.default.createElement(
          'span',
          null,
          '\u5171\u8BA1 ',
          question.answers.length,
          ' \u4E2A\u56DE\u7B54'
        )
      ),
      answers
    )
  );
};

exports.default = QaCard;