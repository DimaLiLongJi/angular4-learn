const express = require('express');

const router = express.Router();
const _ = require('lodash');
const logger = require('../../../../utils/logger')('company');
const industryIntroService = require('../../../../services/discovery/industry/intro');

module.exports = router;

router.get('/intro', (req, res) => {
  const params = _.pick(req.query, [
    'industryId'
  ]);
  industryIntroService.getDetail(params)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      err.message = err.message || '获取百科行业介绍失败';
      logger.debug('get company list failed, err is', err, 'params is', params);
      res.status(500).send(err);
    });
});
