'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _paginationLink = require('../../../common/paginationLink');

var _paginationLink2 = _interopRequireDefault(_paginationLink);

var _OpportunityCard = require('../OpportunityCard');

var _OpportunityCard2 = _interopRequireDefault(_OpportunityCard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import { Pagination, } from 'antd';


var OppList = function (_Component) {
	_inherits(OppList, _Component);

	function OppList() {
		_classCallCheck(this, OppList);

		return _possibleConstructorReturn(this, (OppList.__proto__ || Object.getPrototypeOf(OppList)).apply(this, arguments));
	}

	_createClass(OppList, [{
		key: 'render',
		value: function render() {
			var _p = this.props;
			var opps = _p.opps;
			var _p$paginationInfo = _p.paginationInfo,
			    pageNum = _p$paginationInfo.pageNum,
			    totalItems = _p$paginationInfo.totalItems,
			    itemsPerPage = _p$paginationInfo.itemsPerPage;

			var totalPages = Math.ceil(totalItems / itemsPerPage);
			var _pagination = totalPages > 1 && _react2.default.createElement(_paginationLink2.default, {
				current: pageNum,
				total: totalItems,
				defaultCurrent: pageNum,
				defaultPageSize: itemsPerPage,
				onChange: function onChange(pageNumber) {
					return _p.changePage(pageNumber);
				} });
			var countResult = _p.showCount ? _react2.default.createElement(
				'p',
				{ className: 'count-result' },
				' \u5171\u8BA1 ',
				_react2.default.createElement(
					'span',
					null,
					totalItems
				),
				' \u4E2A\u7ED3\u679C'
			) : _react2.default.createElement(
				'p',
				{ className: 'count-result' },
				' '
			);
			return _react2.default.createElement(
				'div',
				{ className: 'all-opp-list' },
				countResult,
				_react2.default.createElement(
					'div',
					{ className: 'list' },
					opps.map(function (opp) {
						return _react2.default.createElement(_OpportunityCard2.default, { key: opp.id, opportunity: opp });
					})
				),
				_pagination
			);
		}
	}]);

	return OppList;
}(_react.Component);

OppList.propTypes = {
	opps: _propTypes2.default.array,
	paginationInfo: _propTypes2.default.shape({
		pageNum: _propTypes2.default.number,
		totalItems: _propTypes2.default.number,
		itemsPerPage: _propTypes2.default.number
	}),
	changePage: _propTypes2.default.func
};
exports.default = OppList;