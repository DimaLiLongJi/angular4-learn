'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  return _react2.default.createElement(
    'nav',
    { className: 'nav-bar' },
    _react2.default.createElement(
      _reactRouterDom.NavLink,
      { activeClassName: 'active', to: '/recruit_calendar/countdown' },
      _react2.default.createElement(
        'span',
        null,
        '\u4E00\u5468\u5185\u622A\u6B62',
        _react2.default.createElement(
          'svg',
          { className: 'icon close-btn', 'aria-hidden': 'true' },
          _react2.default.createElement('use', { xlinkHref: '#icon-icon-hot-' })
        )
      )
    ),
    _react2.default.createElement(
      _reactRouterDom.NavLink,
      { activeClassName: 'active', to: '/recruit_calendar/all' },
      _react2.default.createElement(
        'span',
        null,
        '\u5168\u90E8\u7F51\u7533'
      )
    )
  );
};