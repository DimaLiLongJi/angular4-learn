'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Placeholder = function Placeholder() {
  return _react2.default.createElement(
    'div',
    { className: 'list-plcaeholder' },
    _react2.default.createElement('img', { src: '/images/no-recommended-opp.png' }),
    _react2.default.createElement(
      'p',
      null,
      '\u6682\u65E0\u641C\u7D22\u7ED3\u679C'
    )
  );
};

exports.default = Placeholder;