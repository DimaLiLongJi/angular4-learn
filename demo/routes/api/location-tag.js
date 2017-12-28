
const router = require('express').Router();
const locationTagService = require('../../services/location-tag-service');

module.exports = router;

router.get('/location_tags', (req, res) => {
  locationTagService.getLocationTagList()
    .then((result) => {
      res.json(result);
    });
});
