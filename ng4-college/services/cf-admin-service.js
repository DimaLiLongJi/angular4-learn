const config = require('config');
const rp = require('request-promise');
const logger = require('../utils/logger')('cf-admin service');

const cfAdminPass = config.cfAdmin;

let adminBaseUrl = config.baseUrls.CF_ADMIN_BASE_URL;

if (['test', 'production'].indexOf(process.env.NODE_ENV) > -1) {
  adminBaseUrl = 'http://cf-nginx_cf-nginx/';
}

module.exports = {
  execRpWithOptions
};

// cookie jar used in request
const jar = rp.jar();
jar.setCookie(rp.cookie('role=system'), adminBaseUrl);

// cf-admin token
const TOKEN = {
  val: '',
  expiresAt: 0
};

const getCfAdminTokenOptions = {
  method: 'post',
  headers: {
    Host: cfAdminPass.hostname,
  },
  jar,
  body: cfAdminPass,
  json: true,
  url: `${adminBaseUrl}api/auth/login?getToken=1`
};

function execRpWithOptions(params) {
  return execRp(params, 0);
}

function execRp(pms, cnt) {
  return buildRequestOptions(pms)
    .then(rp)
    .catch((error) => {
      console.error(error);
      if (error.statusCode === 403 && cnt < 5) {
        delete TOKEN.val;
        return execRp(pms, cnt + 1);
      }
      return Promise.reject(error);
    });
}

async function getCfAdminToken() {
  if (TOKEN.val && TOKEN.expiresAt &&
    TOKEN.expiresAt > Date.now()) {
    return Promise.resolve(TOKEN.val);
  }
  return rp(getCfAdminTokenOptions)
    .then((res) => {
      TOKEN.val = res;
      TOKEN.expiresAt = Date.now() + (24 * 3600 * 1000);
      jar.setCookie(rp.cookie(`token=${res}`), adminBaseUrl);
      return TOKEN.val;
    })
    .catch((error) => {
      logger.error('get cf-admin token auth error: ', error);
    });
}

function buildRequestOptions(params) {
  return getCfAdminToken()
    .then(() => ({
      method: params.method,
      json: true,
      headers: {
        Host: cfAdminPass.hostname,
      },
      jar,
      qs: params.qs,
      body: params.body,
      url: `${adminBaseUrl}api/${params.uri}`
    }));
}
