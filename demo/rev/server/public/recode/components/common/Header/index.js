'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _account = require('./account');

var _account2 = _interopRequireDefault(_account);

var _navs = require('./navs');

var _navs2 = _interopRequireDefault(_navs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var navs = [{
  name: '名企实习',
  to: '/opportunity'
}, {
  name: '校招日历',
  to: '/recruit_calendar'
}, {
  name: '求职探索',
  to: '/discovery'
}, {
  name: '资料中心',
  to: '/interview_material'
}];

var Header = function Header(props) {
  return _react2.default.createElement(
    'header',
    { className: 'clearfix page-header' },
    _react2.default.createElement(
      'div',
      { className: 'wrap' },
      _react2.default.createElement('h1', { className: 'logo' }),
      _react2.default.createElement(_account2.default, null),
      _react2.default.createElement(_navs2.default, { navs: navs })
    )
  );
};

exports.default = Header;