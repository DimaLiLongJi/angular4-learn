'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PositionCard = function PositionCard(props) {
  var favorite = props.favorite;
  if (!favorite || !favorite.opportunity) return '';

  var opportunity = favorite.opportunity;
  var expiredTag = _react2.default.createElement(
    'dd',
    { className: 'expire' },
    _react2.default.createElement('img', { src: 'http://static.careerfrog.com.cn/cf-college/images/expire.fce18569.png', alt: '' })
  );
  var companyLabel = _react2.default.createElement(
    'span',
    { className: 'tag' },
    opportunity.companyLabel
  );

  var handleClick = function handleClick() {
    if (opportunity.status !== 3) {
      window.location = '/pc/opportunity_detail/' + opportunity.id;
    }
  };

  return _react2.default.createElement(
    'li',
    { className: 'account-favorite-oppDetail' },
    _react2.default.createElement('img', { src: opportunity.companyImage, alt: 'opp.company' }),
    _react2.default.createElement(
      'dl',
      { className: opportunity.status === 3 ? 'opp-expire' : 'info' },
      _react2.default.createElement(
        'div',
        { onClick: handleClick },
        _react2.default.createElement(
          'dt',
          { className: 'main-info' },
          _react2.default.createElement(
            'strong',
            null,
            opportunity.position
          ),
          _react2.default.createElement(
            'span',
            null,
            '\u53D1\u5E03\u4E8E \xA0\xA0',
            (0, _moment2.default)(opportunity.publishDate).format('YYYY-MM-DD')
          )
        ),
        _react2.default.createElement(
          'dd',
          { className: 'other-info' },
          _react2.default.createElement(
            'span',
            null,
            opportunity.location
          ),
          '\xA0\xA0|\xA0\xA0',
          _react2.default.createElement(
            'span',
            null,
            opportunity.company
          )
        )
      ),
      _react2.default.createElement(
        'dd',
        { className: 'action' },
        opportunity.companyLabel ? companyLabel : '',
        _react2.default.createElement('span', null),
        _react2.default.createElement(
          'a',
          { onClick: props.cancelFavorite.bind(undefined, favorite), href: 'javascript:;' },
          '\u53D6\u6D88\u6536\u85CF'
        )
      ),
      opportunity.status === 3 ? expiredTag : ''
    )
  );
};

exports.default = PositionCard;