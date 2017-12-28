'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var opp = _ref.opp;

  return _react2.default.createElement(
    'div',
    { className: 'opp-detail clearfix' },
    _react2.default.createElement(
      'dl',
      null,
      _react2.default.createElement(
        'dt',
        { className: 'clearfix' },
        opp.description ? _react2.default.createElement(
          _reactRouterDom.NavLink,
          { to: '/opportunity_detail/' + opp.id },
          opp.position
        ) : _react2.default.createElement(
          'a',
          { href: opp.applyLink, target: '_blank' },
          opp.position
        ),
        _react2.default.createElement(
          'strong',
          { className: 'category' },
          opp.category.name
        ),
        opp.status === 1 && _react2.default.createElement(
          'strong',
          { className: 'status' },
          '\u672A\u5F00\u59CB'
        ),
        opp.status === 2 && _react2.default.createElement(
          'strong',
          { className: 'status2' },
          '\u8FDB\u884C\u4E2D'
        ),
        opp.status === 3 && _react2.default.createElement(
          'strong',
          { className: 'status' },
          '\u5DF2\u7ED3\u675F'
        )
      ),
      _react2.default.createElement(
        'dd',
        { className: 'clearfix' },
        _react2.default.createElement(
          'svg',
          { className: 'icon', 'aria-hidden': 'true' },
          _react2.default.createElement('use', { xlinkHref: '#icon-zuobiao' })
        ),
        opp.locations[0] && opp.locations[0].name,
        _react2.default.createElement(
          'strong',
          null,
          opp.applyStart ? (0, _utils.fd)(opp.applyStart) : (0, _utils.fd)(opp.publishDate),
          '\uFF08\u5F00\u59CB\uFF09'
        )
      )
    )
  );
};