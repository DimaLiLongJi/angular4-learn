const router = require('express').Router();
// const goWechatFilter = require('../../middlewares/go-wechat-filter');
// const wechatAuth = require('../../middlewares/wechat-auth');
// const auth = require('../../middlewares/auth');
const baseUrls = require('config').baseUrls;

const buildView = require('../../utils/viewBuilder');
const customizedPushService = require('../../services/user/customized_push');

function dateToWeekday(date) {
  const weekDayHash = {
    0: '日',
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六',
  };
  let  weekDay = `星期${weekDayHash[new Date(date).getDay()]}`;
  return weekDay;
}

module.exports = router;

router.get('/', async (req, res) => {
  const params = req.query;
  if (!params.userId || !params.pushDate) {
    return;
  }
  const opportunities = await customizedPushService.getListCustomizedPushByDate(params);
  buildView(req, res, 'customized-opp-daily', {
    user: req.user,
    API_BASE_URL: baseUrls.API_BASE_URL,
    opportunities,
    weekDay: dateToWeekday(opportunities.pushDate),
  });
});
