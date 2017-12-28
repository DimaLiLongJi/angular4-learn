'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.persisted = undefined;

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _danmu = require('./danmu');

var _danmu2 = _interopRequireDefault(_danmu);

var _recruitCalendar = require('./recruitCalendar');

var _recruitCalendar2 = _interopRequireDefault(_recruitCalendar);

var _discovery = require('./discovery');

var _discovery2 = _interopRequireDefault(_discovery);

var _interviewMaterial = require('./interview-material');

var _interviewMaterial2 = _interopRequireDefault(_interviewMaterial);

var _userQuestions = require('./user-questions');

var _userQuestions2 = _interopRequireDefault(_userQuestions);

var _userResumes = require('./user-resumes');

var _userResumes2 = _interopRequireDefault(_userResumes);

var _userApplications = require('./user-applications');

var _userApplications2 = _interopRequireDefault(_userApplications);

var _commonOpportunity = require('./commonOpportunity');

var _commonOpportunity2 = _interopRequireDefault(_commonOpportunity);

var _allOpportunity = require('./allOpportunity');

var _allOpportunity2 = _interopRequireDefault(_allOpportunity);

var _recommendOpportunity = require('./recommendOpportunity');

var _recommendOpportunity2 = _interopRequireDefault(_recommendOpportunity);

var _opportunityDetail = require('./opportunityDetail');

var _opportunityDetail2 = _interopRequireDefault(_opportunityDetail);

var _userFavorite = require('./userFavorite');

var _userFavorite2 = _interopRequireDefault(_userFavorite);

var _company = require('./company');

var _company2 = _interopRequireDefault(_company);

var _question = require('./question');

var _question2 = _interopRequireDefault(_question);

var _common = require('./common');

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { combineReducers, } from 'redux';
exports.default = {
  user: _user2.default,
  config: _config2.default,
  auth: _auth2.default,
  common: _common2.default,
  danmu: _danmu2.default,
  recruitCalendar: _recruitCalendar2.default,
  commonOpp: _commonOpportunity2.default,
  allOpp: _allOpportunity2.default,
  recommendOpp: _recommendOpportunity2.default,
  discovery: _discovery2.default,
  interviewMaterial: _interviewMaterial2.default,
  userFavorite: _userFavorite2.default,
  userQuestions: _userQuestions2.default,
  userResumes: _userResumes2.default,
  userApplications: _userApplications2.default,
  opportunityDetail: _opportunityDetail2.default,
  company: _company2.default,
  question: _question2.default
};
var persisted = exports.persisted = {
  user: _user2.default,
  danmu: _danmu2.default,
  opportunityDetail: _opportunityDetail2.default
};