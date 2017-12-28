'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WeChatCard = function WeChatCard() {
  return _react2.default.createElement(
    'div',
    { className: 'qr-code' },
    _react2.default.createElement('div', { className: 'qr-image' }),
    _react2.default.createElement(
      'p',
      null,
      '\u5173\u6CE8\u670D\u52A1\u53F7\u53EF\u6BCF\u5929',
      _react2.default.createElement('br', null),
      '\u63A5\u6536\u6700\u65B0\u804C\u4F4D\u548C\u7F51\u7533\u4FE1\u606F'
    )
  );
};

exports.default = WeChatCard;