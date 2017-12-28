
const router = require('express').Router();
const logger = require('../../utils/logger')('tag-service');
const tagService = require('../../services/tag-service');

module.exports = router;

router.get('/tags', (req, res) => {
  const category = req.query.category;
  if (category === undefined) {
    res.status(400).send({
      msg: '缺失参数',
    });
    return;
  }
  tagService.getTagList(category)
    .then((tags) => {
      res.json(tags);
    })
    .catch((error) => {
      const errorObj = {
        msg: '获取标签列表失败',
        error,
      };
      logger.error(' cf client getTagList', ' cf client getTagList fail');
      res.status(500).send(errorObj);
    });
});
