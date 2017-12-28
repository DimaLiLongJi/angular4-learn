'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SubNav = function SubNav(props) {
  return _react2.default.createElement(
    'nav',
    { className: 'nav-bar' },
    _react2.default.createElement(
      _reactRouterDom.NavLink,
      { activeClassName: 'active', to: '/opportunity/recommend' },
      _react2.default.createElement(
        'div',
        { className: 'customized' },
        '\u5B9A\u5236'
      ),
      _react2.default.createElement(
        'span',
        null,
        '\u63A8\u8350\u804C\u4F4D'
      )
    ),
    _react2.default.createElement(
      _reactRouterDom.NavLink,
      { activeClassName: 'active', to: '/opportunity/all' },
      _react2.default.createElement(
        'span',
        null,
        '\u5168\u90E8\u804C\u4F4D'
      )
    )
  );
};

exports.default = SubNav;