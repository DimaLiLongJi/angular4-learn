'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CompanyCard;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reactRenderHtml = require('react-render-html');

var _reactRenderHtml2 = _interopRequireDefault(_reactRenderHtml);

var _campusRecruit = require('../../../../constants/campus-recruit');

var _fff = require('../../../../utils/fff');

var _fff2 = _interopRequireDefault(_fff);

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fd(d) {
  if (!d) return '待定';
  return (0, _moment2.default)(d).format('YYYY-MM-DD');
}
// const gotoCompany = (id) => {
//   window.location = `/pc/company/${id}`;
// }
function CompanyCard(props) {
  var cd = props.company.countdown !== undefined && props.company;
  var c = props.company;
  var companyImg = c.imageUrl ? _react2.default.createElement('img', { src: c.imageUrl, alt: '' }) : _react2.default.createElement('img', { src: '/images/default-logo.png', alt: '' });
  var timeRange = c.opportunity && fd(c.opportunity.applyStart) + ' ~ ' + fd(c.opportunity.applyEnd);

  var applyStatus = c.opportunity && (c.opportunity.applyStatus || (0, _fff2.default)(_campusRecruit.STATUSES, 'id', c.opportunity.status, 'status'));

  var statusTxt = (0, _fff2.default)(_campusRecruit.STATUSES, 'status', applyStatus, 'text');

  var subscribeBox = applyStatus === 'waiting' && _react2.default.createElement(
    'div',
    { className: 'date-info' },
    _react2.default.createElement(
      'span',
      null,
      '\u9884\u8BA1\u65F6\u95F4\uFF1A',
      timeRange
    ),
    _react2.default.createElement(
      'div',
      null,
      props.userSubscription && (props.userSubscription.some(function (industry) {
        return industry.industryId === c.industry.id;
      }) ? _react2.default.createElement(
        'div',
        { className: 'subscription-btn' },
        _react2.default.createElement(
          'svg',
          { className: 'icon close-btn', 'aria-hidden': 'true' },
          _react2.default.createElement('use', { xlinkHref: '#icon-naoling-' })
        ),
        ' \u5DF2\u8BA2\u9605'
      ) : _react2.default.createElement(
        'div',
        { className: 'subscription-btn subscriptioned-btn',
          onClick: function onClick() {
            return props.onSubsClick(c);
          } },
        _react2.default.createElement(
          'svg',
          { className: 'icon close-btn', 'aria-hidden': 'true' },
          _react2.default.createElement('use', { xlinkHref: '#icon-naoling-' })
        ),
        ' \u8BA2\u9605\u63D0\u9192'
      ))
    )
  );

  var countDown = cd && _react2.default.createElement(
    'h3',
    { className: 'countdown' },
    '\u5012\u8BA1\u65F6 ',
    _react2.default.createElement(
      'span',
      null,
      c.countdown
    ),
    ' \u5929'
  );

  if (!c.text && c.introduction) {
    c.text = c.introduction;
  } else {
    c.text = c.text || '暂无';
  }

  return c && c.id && _react2.default.createElement(
    'div',
    { className: 'campus-recruit-detail' },
    _react2.default.createElement(
      _reactRouterDom.NavLink,
      { to: '/company/' + c.id },
      _react2.default.createElement(
        'div',
        { className: 'company-info' },
        companyImg,
        _react2.default.createElement(
          'ul',
          { className: 'info' },
          _react2.default.createElement(
            'li',
            { className: 'name' },
            c.name
          ),
          c.industry && _react2.default.createElement(
            'li',
            null,
            '\u884C\u4E1A\uFF1A',
            _react2.default.createElement(
              'span',
              null,
              c.industry.name
            )
          ),
          c.size && _react2.default.createElement(
            'li',
            null,
            '\u89C4\u6A21\uFF1A',
            _react2.default.createElement(
              'span',
              null,
              c.size.name
            )
          )
        )
      ),
      cd && countDown,
      !cd && _react2.default.createElement(
        'div',
        { className: 'introduction' },
        (0, _reactRenderHtml2.default)(c.text)
      )
    ),
    subscribeBox,
    ['ongoing', 'finished'].indexOf(applyStatus) > -1 && _react2.default.createElement(
      'p',
      { className: 'date-info' },
      ' ',
      _react2.default.createElement(
        'span',
        null,
        '\u6821\u62DB\u65F6\u95F4\uFF1A',
        timeRange
      )
    ),
    !cd && _react2.default.createElement(
      'span',
      { className: 'status ' + applyStatus },
      statusTxt
    )
  );
}

CompanyCard.propTypes = {
  onSubsClick: _propTypes2.default.func,
  company: _propTypes2.default.object,
  companies: _propTypes2.default.object
};