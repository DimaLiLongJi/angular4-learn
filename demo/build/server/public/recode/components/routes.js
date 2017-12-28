'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _opportunity = require('./opportunity');

var _opportunity2 = _interopRequireDefault(_opportunity);

var _recruitCalendar = require('./recruit-calendar');

var _recruitCalendar2 = _interopRequireDefault(_recruitCalendar);

var _opportunityDetail = require('./opportunity-detail');

var _opportunityDetail2 = _interopRequireDefault(_opportunityDetail);

var _all = require('./recruit-calendar/all');

var _all2 = _interopRequireDefault(_all);

var _countdown = require('./recruit-calendar/countdown');

var _countdown2 = _interopRequireDefault(_countdown);

var _discovery = require('./discovery');

var _discovery2 = _interopRequireDefault(_discovery);

var _interviewMaterial = require('./interview-material');

var _interviewMaterial2 = _interopRequireDefault(_interviewMaterial);

var _account = require('./account');

var _account2 = _interopRequireDefault(_account);

var _company = require('./company');

var _company2 = _interopRequireDefault(_company);

var _question = require('./question');

var _question2 = _interopRequireDefault(_question);

var _all3 = require('./opportunity/all');

var _all4 = _interopRequireDefault(_all3);

var _recommend = require('./opportunity/recommend');

var _recommend2 = _interopRequireDefault(_recommend);

var _errorPage = require('./common/errorPage');

var _errorPage2 = _interopRequireDefault(_errorPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = [{
  path: '/',
  exact: true,
  component: function component() {
    return _react2.default.createElement(_reactRouterDom.Redirect, { to: '/opportunity/all' });
  }
}, {
  path: '/error',
  component: _errorPage2.default
}, {
  path: '/opportunity',
  component: _opportunity2.default,
  routes: [{
    path: '/opportunity/all',
    component: _all4.default
  }, {
    path: '/opportunity/recommend',
    component: _recommend2.default
  }]
}, {
  path: '/opportunity_detail/:id',
  component: _opportunityDetail2.default
}, {
  path: '/recruit_calendar',
  component: _recruitCalendar2.default,
  routes: [{
    path: '/recruit_calendar/all',
    component: _all2.default
  }, {
    path: '/recruit_calendar/countdown',
    component: _countdown2.default
  }]
}, {
  path: '/discovery',
  component: _discovery2.default
}, {
  path: '/interview_material',
  component: _interviewMaterial2.default
}, {
  path: '/account',
  component: _account2.default
}, {
  path: '/company/:companyId',
  component: _company2.default
}, {
  path: '/question',
  component: _question2.default
}, {
  path: '*',
  component: function component() {
    return _react2.default.createElement(_reactRouterDom.Redirect, { to: '' });
  }
}];

exports.default = routes;