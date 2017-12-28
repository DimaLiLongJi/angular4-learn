'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OpportunityCard = function OpportunityCard(props) {
  return _react2.default.createElement(
    _reactRouterDom.NavLink,
    { to: '/opportunity_detail/' + props.opportunity.id, className: 'opportunity-card' },
    _react2.default.createElement(
      'p',
      { className: 'tag' },
      props.opportunity.company.companyLabel
    ),
    _react2.default.createElement(
      'figure',
      null,
      _react2.default.createElement('img', { src: props.opportunity.company.imageUrl, alt: props.opportunity.company.name }),
      _react2.default.createElement(
        'figcaption',
        null,
        _react2.default.createElement(
          'h3',
          null,
          props.opportunity.position
        ),
        _react2.default.createElement(
          'p',
          { className: 'company' },
          _react2.default.createElement(
            'strong',
            null,
            props.opportunity.company.name
          ),
          _react2.default.createElement(
            'span',
            { className: 'category' },
            props.opportunity.category.name
          )
        ),
        _react2.default.createElement(
          'p',
          { className: 'location' },
          _react2.default.createElement(
            'span',
            null,
            _react2.default.createElement('i', { className: 'iconfont icon-zuobiao' }),
            _react2.default.createElement(
              'span',
              null,
              props.opportunity.locations[0].name,
              '\xA0'
            )
          ),
          _react2.default.createElement(
            'time',
            null,
            props.opportunity.publishDate.match(/\d+\-\d+\-\d+/)[0]
          )
        )
      )
    )
  );
};

exports.default = OpportunityCard;