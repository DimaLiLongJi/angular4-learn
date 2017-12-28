'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Lable = function Lable(_ref) {
  var fontclass = _ref.fontclass,
      text = _ref.text;
  return _react2.default.createElement(
    'div',
    { className: 'form-lable' },
    _react2.default.createElement(
      'svg',
      { className: 'icon', 'aria-hidden': 'true' },
      _react2.default.createElement('use', { xlinkHref: fontclass })
    ),
    text
  );
};
Lable.propTypes = {
  fontclass: _propTypes2.default.string,
  text: _propTypes2.default.string
};

exports.default = Lable;