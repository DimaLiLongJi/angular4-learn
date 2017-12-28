'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRenderHtml = require('react-render-html');

var _reactRenderHtml2 = _interopRequireDefault(_reactRenderHtml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var company = _ref.company;

  if (!company.introduction && !company.officialUrl) {
    return null;
  }
  return _react2.default.createElement(
    'div',
    { className: 'synopsis' },
    _react2.default.createElement(
      'div',
      { id: 'company-detail-info', className: 'section-title clearfix' },
      _react2.default.createElement(
        'svg',
        { className: 'icon', 'aria-hidden': 'true' },
        _react2.default.createElement('use', { xlinkHref: '#icon-intro' })
      ),
      '\u516C\u53F8\u7B80\u4ECB'
    ),
    _react2.default.createElement(
      'div',
      { className: 'introduction' },
      (0, _reactRenderHtml2.default)(company.introduction || ''),
      !!company.officialUrl && _react2.default.createElement(
        'p',
        null,
        '\u516C\u53F8\u5B98\u7F51\uFF1A',
        _react2.default.createElement(
          'a',
          { href: "http://" + company.officialUrl, className: 'official-url', target: '_blank' },
          company.officialUrl
        )
      )
    )
  );
};