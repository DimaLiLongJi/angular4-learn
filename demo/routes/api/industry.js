const router = require('express').Router();
const logger = require('../../utils/logger')('industry-service');
const industryService = require('../../services/industry-service');

module.exports = router;

router.get('/industries', (req, res) => {
  industryService.getList(req.query)
    .then((tags) => {
      res.json(tags);
    })
    .catch((error) => {
      const errorObj = {
        msg: '获取行业列表失败',
        error,
      };
      logger.error(' cf client getIndustryList', ' cf client getIndustryList fail');
      res.status(500).send(errorObj);
    });
});
