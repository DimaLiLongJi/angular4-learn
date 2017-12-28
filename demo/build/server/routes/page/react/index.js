'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _auth = require('../../../middlewares/auth');

var _auth2 = _interopRequireDefault(_auth);

var _config = require('config');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _reactRouterConfig = require('react-router-config');

var _middlewares = require('./middlewares');

var _routes = require('../../../public/recode/components/routes');

var _routes2 = _interopRequireDefault(_routes);

var _viewBuilder = require('../../../utils/viewBuilder');

var _viewBuilder2 = _interopRequireDefault(_viewBuilder);

var _appPc = require('./app-pc');

var _appPc2 = _interopRequireDefault(_appPc);

var _initStore = require('./init-store');

var _initStore2 = _interopRequireDefault(_initStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*eslint-disable*/


// import Loadable from 'loadable-components';
const router = _express2.default.Router();
/*eslint-enable*/

module.exports = router;

router.get('*', _auth2.default, (req, res) => {
  if (!_config.ssrEnabled) {
    return renderNoSSR(req, res);
  }

  const RouterPath = req.url.split('?')[0];
  const branch = (0, _reactRouterConfig.matchRoutes)(_routes2.default, RouterPath);
  const store = (0, _initStore2.default)(req, RouterPath);

  return fetchDatas().then(() => {
    let context = {};

    const content = renderApp(context);

    const helmet = _reactHelmet2.default.renderStatic();
    const tdk = `${helmet.title.toString()}${helmet.meta.toString()}`;

    if (context.status === 302 || context.action === 'REPLACE') {
      return res.redirect(302, context.url);
    }

    (0, _viewBuilder2.default)(req, res, 'index_v2', {
      data: store.getState(),
      content,
      tdk,
      dontGetUser: 1
    });
  }).catch(e => {
    console.error('ssr error:', e);
    renderNoSSR(req, res);
  });

  function renderApp(context) {
    const app = (0, _appPc2.default)(store, context, RouterPath);
    let content = (0, _server.renderToString)(app);
    content = content.replace(/href="\/pc\?/g, `href="/pc${RouterPath}?`);
    return content;
  }

  function fetchDatas() {
    const promises = branch.map(({ route, match }) => {
      let fetchData = route.component.fetchData;
      const params = Object.assign({}, req.query);
      Object.keys(match.params).forEach(k => {
        params[k] = match.params[k].split('?')[0];
      });
      Object.keys(params).forEach(k => {
        const val = params[k];
        if (/^\d+$/.test(val)) params[k] = Number(val);
      });
      return fetchData instanceof Function ? fetchData(store, params) : Promise.resolve(null);
    });
    return Promise.race([rejectAfterTime(), Promise.all(promises)]);
  }
});

function rejectAfterTime(delay) {
  return new Promise((res, rej) => setTimeout(rej, delay || 1000));
}

function renderNoSSR(req, res) {
  return (0, _viewBuilder2.default)(req, res, 'index_v2', {
    data: {
      user: req.user || {},
      config: _middlewares.constants
    },
    content: '',
    tdk: '',
    dontGetUser: 1
  });
}