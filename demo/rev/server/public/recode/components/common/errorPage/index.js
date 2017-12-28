'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var error = _ref.error,
      info = _ref.info;

  if (global.window && /^test/.test(window.location.host) && error) {
    var errorStyle = {
      fontSize: '14px',
      padding: '12px',
      margin: '24px',
      color: 'red'
    };
    return _react2.default.createElement(
      'div',
      { style: errorStyle },
      _react2.default.createElement(
        'h2',
        null,
        _react2.default.createElement(
          'strong',
          null,
          error.message,
          ': '
        )
      ),
      _react2.default.createElement('br', null),
      _react2.default.createElement(
        'pre',
        null,
        error.stack
      ),
      _react2.default.createElement('br', null),
      _react2.default.createElement(
        'h3',
        null,
        'INFO: '
      ),
      _react2.default.createElement('br', null),
      JSON.stringify(info).split('\\n').map(function (i) {
        return _react2.default.createElement(
          'p',
          null,
          i
        );
      })
    );
  }
  return _react2.default.createElement(
    'div',
    { className: 'error-page' },
    _react2.default.createElement(
      'a',
      { href: '/pc' },
      '\u8FD4\u56DE\u9996\u9875'
    )
  );
};