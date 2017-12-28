'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PageFooter = function PageFooter(props) {
  return _react2.default.createElement(
    'footer',
    { className: 'page-footer' },
    _react2.default.createElement(
      'div',
      { className: 'wrap' },
      _react2.default.createElement(
        'div',
        { className: 'site-info' },
        _react2.default.createElement(
          'h3',
          null,
          '\u8054\u7CFB\u6211\u4EEC'
        ),
        _react2.default.createElement(
          'p',
          null,
          '\u54A8\u8BE2\u90AE\u7BB1\uFF1Acollege.feedback@careerfrog.com.cn',
          _react2.default.createElement('br', null),
          '\u516C\u53F8\u5730\u5740\uFF1A\u4E0A\u6D77\u5E02\u957F\u5B81\u533A\u5EF6\u5B89\u897F\u8DEF889\u53F7\u592A\u5E73\u6D0B\u4F01\u4E1A\u4E2D\u5FC322\u697C',
          _react2.default.createElement('br', null),
          '\u7F51\u7AD9\u5907\u6848\u7F16\u53F7\uFF1A\u6CAAICP\u590712026287\u53F7-1'
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'contact' },
        _react2.default.createElement(
          'h3',
          null,
          '\u5173\u6CE8\u6211\u4EEC'
        ),
        _react2.default.createElement(
          'figure',
          null,
          _react2.default.createElement(
            'figcaption',
            null,
            '\u5B98\u65B9\u5FAE\u4FE1\uFF1A'
          ),
          _react2.default.createElement('img', { src: 'http://static.careerfrog.com.cn/cf-college/images/college-wechat-code.3bcc73d3.jpg', alt: '' })
        )
      )
    ),
    _react2.default.createElement(
      'p',
      { className: 'copyright' },
      '\u7248\u6743\u6240\u6709\uFF1A\u4E0A\u6D77\u51EF\u6D1B\u683C\u4FE1\u606F\u79D1\u6280\u6709\u9650\u516C\u53F8'
    )
  );
};

exports.default = PageFooter;