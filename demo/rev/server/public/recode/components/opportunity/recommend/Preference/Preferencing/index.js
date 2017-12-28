'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Unreference = function Unreference(_ref) {
	var duration = _ref.duration;
	return _react2.default.createElement(
		'div',
		{ className: 'progress-bar-wrap' },
		_react2.default.createElement(
			'div',
			{ className: 'progress-bar-container' },
			_react2.default.createElement(
				'div',
				{ className: 'progress-wrap' },
				_react2.default.createElement('div', { className: 'progress', style: { animation: 'progressing ' + duration + 's 1' } })
			),
			_react2.default.createElement(
				'h1',
				null,
				'\u9875\u9762\u5B9A\u5236\u4E2D\u2026\u2026'
			)
		)
	);
};

Unreference.propTypes = {
	duration: _propTypes2.default.number
};

exports.default = Unreference;