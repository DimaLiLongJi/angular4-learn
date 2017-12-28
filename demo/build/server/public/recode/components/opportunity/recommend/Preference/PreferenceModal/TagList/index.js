'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TagList = function TagList(_ref) {
	var tag = _ref.tag,
	    index = _ref.index,
	    selectTag = _ref.selectTag;
	return _react2.default.createElement(
		'div',
		{ className: 'tag-list' },
		_react2.default.createElement(
			'h3',
			{ className: 'tag-list-title' },
			_react2.default.createElement(
				'span',
				null,
				tag.stepNum
			),
			' ',
			tag.title
		),
		_react2.default.createElement(
			'ul',
			null,
			tag.tagArray.map(function (tag) {
				return _react2.default.createElement(
					'li',
					{ className: (0, _classnames2.default)('tag', { active: tag.selected }),
						onClick: function onClick() {
							return selectTag(index, tag);
						},
						key: tag.name },
					tag.name
				);
			})
		)
	);
};

TagList.propTypes = {
	tag: _propTypes2.default.object,
	index: _propTypes2.default.number,
	selectTag: _propTypes2.default.func
};

exports.default = TagList;