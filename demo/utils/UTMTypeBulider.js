'use strict';
const config = require('config');
const logger = require('./logger')('utils/UTMTypeBulider');
const encodeService = require('./encodeService');

module.exports = buildUTMType;

function buildUTMType(req) {
  var UTM = {};
  var UTMType = '';

  for (var key in config.trackUserSource) {
    let track = config.trackUserSource[key];
    logger.debug('config.trackUserSource', track);
    let UTMValue = req.query[track] || req.cookies[track];
    UTM[track] = '';
    if (UTMValue) {
      UTM[track] = encodeService.decodeFromGb2312(UTMValue);
    }
  }
  UTMType = matchLevel(UTM.utm_source, UTM.utm_medium, UTM.utm_campaign);
  console.log('UTMType is ', UTMType);
  logger.info('UTMType', UTMType);
  return {
    UTMType: UTMType
  };
}

function matchLevel(source, medium, campaign) {
  if (source === '' &&
      medium === '' &&
      campaign === '') {
        return 'default';
      }
  switch (source) {
    case "baidu":
      return 'bd';
    case "bd":
      return 'bd';
    case "sougou":
      return 'sg';
    case "sg":
      return 'sg';
    case "gg":
      return 'gg';
    case "360":
      return '360';
    case "sm":
      return 'sm';
    case "jrtt":
      return 'jrtt';
    case "gdt":
      return 'gdt';
    default:
      return 'other';
  }
  switch (campaign) {
    case "wm-*":
      return 'bd';
    case "dsp-*":
      return 'bd';
    default:
      return 'other';
  }
  switch (source + medium + campaign) {
    case 'socialweixinqrcode':
      return 'wx';
    default:
      return 'other';
  }

}
