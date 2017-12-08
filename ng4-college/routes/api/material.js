const router = require('express').Router();
const materialService = require('../../services/material-service');

module.exports = router;

router.get('/materials', async (req, res) => {
  const params = req.query;
  const tipsParams = Object.assign({ type: 1, }, params);
  const materialsParams = Object.assign({ type: 0, }, params);
  tipsParams.pageNum = 1;
  tipsParams.itemsPerPage = 100;

  try {
    const tips = await materialService.getMaterialList(tipsParams);
    const material = await materialService.getMaterialList(materialsParams);
    res.json({
      tips,
      material,
    });
  } catch (error) {
      res.status(500).send({
        msg: 'get material failed',
        error,
      });
  }
});

router.get('/materials/:id/view', (req, res) => {
  const id = req.params.id;
  console.log('/materials/:id/view', id);
   materialService.countViewMaterial(id)
   .then((result) => {
     res.json(result);
   })
   .catch((error) => {
     res.status(500).send({
       msg: 'count view material failed',
       error,
     });
   });
});

router.get('/materials/:id/download', (req, res) => {
  const id = req.params.id;
  console.log('/materials/:id/download', id);
   materialService.countDownloadMaterial(id)
   .then((result) => {
     res.json(result);
   })
   .catch((error) => {
     res.status(500).send({
       msg: 'count view material failed',
       error,
     });
   });
});

router.get('/materials/hot_companies', (req, res) => {
  const params = req.query;
   materialService.getHotCompany(params)
   .then((result) => {
     res.json(result);
   })
   .catch((error) => {
     res.status(500).send({
       msg: 'get hot company failed',
       error,
     });
   });
});
