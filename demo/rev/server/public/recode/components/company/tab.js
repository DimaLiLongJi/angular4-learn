'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Link = _antd.Anchor.Link;

exports.default = function (_ref) {
  var totalItems = _ref.totalItems,
      status = _ref.status;

  var totalItemsLabel = '\u5728\u62DB\u804C\u4F4D\uFF08' + totalItems + '\uFF09';
  return _react2.default.createElement(
    _antd.Anchor,
    { showInkInFixed: false },
    _react2.default.createElement(
      'div',
      { className: 'tab-bar-wrap' },
      status && _react2.default.createElement(Link, { href: '#company-detail-info', title: '\u516C\u53F8\u8BE6\u60C5' }),
      _react2.default.createElement(Link, { href: '#company-detail-opps', title: totalItemsLabel })
    )
  );
};