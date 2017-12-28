'use strict';

let buildView = (() => {
  var _ref = _asyncToGenerator(function* (req, res, name, params = {}) {
    buildTrackUserSource(req, res);
    if (req.query.x_field_1) {
      res.cookie('x_field_1', req.query.x_field_1, {
        domain: '.careerfrog.com.cn'
      });
    }
    const agent = ua(req.headers['user-agent']);
    let user = null;
    if (!params.dontGetUser) {
      try {
        if (req.cookies.wechatToken) {
          user = yield cipherService.parseToken(req.cookies.wechatToken);
          if (user.openId) {
            user = yield authService.getUserInfo({
              openId: user.openId
            });
          }
        }
      } catch (e) {
        res.clearCookie('wechatToken');
        logger.error('jwt token expired');
      }
    }

    params.user = user;
    Object.assign(params, baseUrls);
    Object.assign(params, buildUTMType(req));
    if (user) {
      // if (user && user.id) {
      const preferences = yield userCustomizationService.getCustomizeInfo(user.id);
      user.preferences = preferences;
      // console.log('preference', preferences);
      if (preferences) {
        user.isPreferenced = preferences.industries.length || preferences.positions.length || preferences.stages.length || preferences.locations.length;
      }
    }
    const options = {};
    if (params.injectCheck) {
      options.injectCheck = params.injectCheck;
    }
    if (agent.mobile) {
      options.isMobile = true;
    }
    res.render(name, params, injectAnalytics(res, options));
  });

  return function buildView(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const config = require('config');
const cipherService = require('../services/cipher-service');
const logger = require('./logger')('utils/viewBuilder');
const injectAnalytics = require('./injectAnalytics.js');
const buildUTMType = require('./UTMTypeBulider.js');
const encodeService = require('./encodeService');
const authService = require('../services/user/auth');
const userCustomizationService = require('../services/user/customize');
const ua = require('../utils/userAgent');

const baseUrls = config.base_urls;

module.exports = buildView;

function buildTrackUserSource(req, res) {
  // jshint ignore: line
  const trackUserSources = {};
  const utm = req.cookies.utm || [];
  const source = {};
  for (const key in config.trackUserSource) {
    const track = config.trackUserSource[key];
    let trackUserSource = req.query[track];
    if (trackUserSource) {
      logger.warn('before GB2312 decode: ', trackUserSource);
      trackUserSource = encodeService.decodeFromGb2312(trackUserSource);
      logger.warn('after GB2312 decode: ', trackUserSource);
      source[key] = trackUserSource;
    }
  }

  source.ip = req.headers['x-real-ip'];
  if (Object.keys(source).length > 1) {
    if (utm.length > 0) {
      if (utm.length > 2) {
        if (JSON.stringify(utm[2]) !== JSON.stringify(source)) {
          // jshint ignore: line
          utm[2] = source;
        }
      } else if (JSON.stringify(utm[utm.length - 1]) !== JSON.stringify(source)) {
        // jshint ignore: line
        utm.push(source);
      }
    } else {
      utm.push(source);
    }
    res.cookie('utm', utm, {
      domain: '.careerfrog.com.cn'
    });
  }
  return trackUserSources;
}