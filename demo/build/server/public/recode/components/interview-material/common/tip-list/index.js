'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _tip = require('../../common/tip');

var _tip2 = _interopRequireDefault(_tip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var tips = _ref.tips;

  if (!tips.items || tips.items.length === 0) return null;
  return _react2.default.createElement(
    'div',
    { className: 'tip-list-wrapper' },
    _react2.default.createElement(
      'div',
      { className: 'section-title' },
      '\u9762\u8BD5\u9526\u56CA'
    ),
    _react2.default.createElement(
      'div',
      { className: 'search-list tip-list' },
      tips.items.map(function (tip, index) {
        return _react2.default.createElement(_tip2.default, { tip: tip, key: index });
      })
    )
  );
};