const router = require('express').Router();
const logger = require('../../utils/logger')('tag-service');
const professionService = require('../../services/profession');

module.exports = router;

router.get('/professions', (req, res) => {
  professionService.getList(professionService)
    .then((tags) => {
      res.json(tags);
    })
    .catch((error) => {
      const errorObj = {
        msg: '获取职位列表失败',
        error,
      };
      logger.error(' cf college getProfessionList', ' cf college getProfessionList fail');
      res.status(500).send(errorObj);
    });
});
