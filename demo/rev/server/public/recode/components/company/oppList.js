'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _oppItem = require('./oppItem');

var _oppItem2 = _interopRequireDefault(_oppItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var count = _ref.count,
      company = _ref.company,
      opportunityList = _ref.opportunityList,
      campusOpportunityList = _ref.campusOpportunityList;
  return _react2.default.createElement(
    'div',
    { id: 'company-detail-opps' },
    _react2.default.createElement(
      'div',
      { className: 'section-title clearfix' },
      _react2.default.createElement(
        'svg',
        { className: 'icon', 'aria-hidden': 'true' },
        _react2.default.createElement('use', { xlinkHref: '#icon-position' })
      ),
      '\u5728\u62DB\u804C\u4F4D\uFF08',
      count,
      '\uFF09'
    ),
    _react2.default.createElement(
      'div',
      { id: 'company-detail-opps' },
      _react2.default.createElement(
        'h3',
        { className: 'opp-category' },
        '\u6821\u62DB\u7F51\u7533'
      ),
      !campusOpportunityList.length && _react2.default.createElement('div', { className: 'no-campus-recruit' }),
      campusOpportunityList.map(function (opp) {
        return _react2.default.createElement(_oppItem2.default, { key: opp.id, opp: opp });
      }),
      !!opportunityList.opps.length && _react2.default.createElement(
        'h3',
        { className: 'opp-category' },
        '\u65E5\u5E38\u62DB\u8058'
      ),
      opportunityList.opps.map(function (opp) {
        return _react2.default.createElement(_oppItem2.default, { key: opp.id, opp: opp });
      })
    )
  );
};