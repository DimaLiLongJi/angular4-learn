
const router = require('express').Router();
const mobilePrefixService = require('../../services/mobile-prefix-service');

module.exports = router;

router.get('/mobile-prefixs', (req, res) => {
  mobilePrefixService.getPrefixList()
    .then((result) => {
      res.json(result);
    });
});
