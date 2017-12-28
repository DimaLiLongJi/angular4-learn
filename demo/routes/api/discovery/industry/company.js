const express = require('express');

const router = express.Router();
const _ = require('lodash');
const logger = require('../../../../utils/logger')('company');
const industryCompanyService = require('../../../../services/discovery/industry/main-company');

module.exports = router;

router.get('/company', (req, res) => {
  const params = _.pick(req.query, [
    'pageNum',
    'itemsPerPage',
    'industryId'
  ]);
  industryCompanyService.getList(params)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      err.message = err.message || '获取百科行业主要公司列表失败';
      logger.debug('get company list failed, err is', err, 'params is', params);
      res.status(500).send(err);
    });
});
