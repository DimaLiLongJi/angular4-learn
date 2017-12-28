'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOppLocationTag = exports.getLocationTag = exports.getAllOppList = exports.ALLOPP_GET_OPP_LOCATION_TAG_LIST = exports.ALLOPP_GET_LOCATION_TAG_LIST = exports.ALLOPP_GET_OPP_LIST = undefined;

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _axios = require('../utils/axios');

var _req = require('./req');

var _req2 = _interopRequireDefault(_req);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ALLOPP_GET_OPP_LIST = exports.ALLOPP_GET_OPP_LIST = 'ALLOPP_GET_OPP_LIST';
var ALLOPP_GET_LOCATION_TAG_LIST = exports.ALLOPP_GET_LOCATION_TAG_LIST = 'ALLOPP_GET_LOCATION_TAG_LIST';
var ALLOPP_GET_OPP_LOCATION_TAG_LIST = exports.ALLOPP_GET_OPP_LOCATION_TAG_LIST = 'ALLOPP_GET_OPP_LOCATION_TAG_LIST';

function _getAllOppList(params) {
  Object.keys(params).forEach(function (k) {
    if (!params[k]) {
      delete params[k];
    }
  });
  return (0, _axios.get)('/api/opportunities?' + _qs2.default.stringify(params));
}

var getAllOppList = exports.getAllOppList = (0, _req2.default)(_getAllOppList, ALLOPP_GET_OPP_LIST);

function _getLocationTag(params) {
  return (0, _axios.get)('/api/location_tags?' + _qs2.default.stringify(params));
}

var getLocationTag = exports.getLocationTag = (0, _req2.default)(_getLocationTag, ALLOPP_GET_LOCATION_TAG_LIST);

function _getOppLocationTag(params) {
  return (0, _axios.get)('/api/opportunities/location/list?' + _qs2.default.stringify(params));
}

var getOppLocationTag = exports.getOppLocationTag = (0, _req2.default)(_getOppLocationTag, ALLOPP_GET_OPP_LOCATION_TAG_LIST);