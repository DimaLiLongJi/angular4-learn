'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _StaticRouter = require('react-router-dom/StaticRouter');

var _StaticRouter2 = _interopRequireDefault(_StaticRouter);

var _reactRouterConfig = require('react-router-config');

var _reactRedux = require('react-redux');

var _routes = require('../../../public/recode/components/routes');

var _routes2 = _interopRequireDefault(_routes);

var _Header = require('../../../public/recode/components/common/Header');

var _Header2 = _interopRequireDefault(_Header);

var _PageFooter = require('../../../public/recode/components/common/PageFooter');

var _PageFooter2 = _interopRequireDefault(_PageFooter);

var _BannerPage = require('../../../public/recode/components/common/Banner-page');

var _BannerPage2 = _interopRequireDefault(_BannerPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (store, context, RouterPath) => _react2.default.createElement(
  _reactRedux.Provider,
  { store: store },
  _react2.default.createElement(
    'div',
    { className: 'app' },
    _react2.default.createElement(
      _StaticRouter2.default,
      { location: RouterPath, context: context, basename: '/pc' },
      _react2.default.createElement(
        'div',
        { className: 'body-content' },
        _react2.default.createElement(_Header2.default, null),
        _react2.default.createElement(_BannerPage2.default, null),
        (0, _reactRouterConfig.renderRoutes)(_routes2.default)
      )
    ),
    _react2.default.createElement(_PageFooter2.default, null)
  )
);

// import Loadable from 'loadable-components';