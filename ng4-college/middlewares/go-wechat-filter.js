const mobileBlocker = require('config').wechat.mobileBlocker;
const path = require('path');
const rootDir = process.cwd();
const ua = require(path.join(rootDir, 'utils/userAgent'));

module.exports = function (req, res, next) {
  let reqPath = req.path;
  let routePath = 'go-wechat';
  if (/go-wechat/.test(reqPath)) {
    next();
    return;
  }

  if (/\/university_tour/.test(reqPath)) {
    routePath = '/university_tour/go-wechat';
  }
  if(mobileBlocker) {
    var agent = ua(req.headers['user-agent']);
    if (agent.mobile && !agent.wechat) {
      console.log('redirect to go wechat page');
      return res.redirect(routePath);
    }
  }

  next();
};
