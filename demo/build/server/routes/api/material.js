'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const router = require('express').Router();
const materialService = require('../../services/material-service');

module.exports = router;

router.get('/materials', (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    const params = req.query;
    const tipsParams = Object.assign({ type: 1 }, params);
    const materialsParams = Object.assign({ type: 0 }, params);
    const preservicesParams = Object.assign({ type: 2 }, params);
    const paperParams = Object.assign({ type: 3 }, params);
    tipsParams.pageNum = 1;
    tipsParams.itemsPerPage = 100;
    try {
      let tips = [];
      let material = [];
      let paper = [];
      let preservices = [];
      switch (params.type) {
        case '0':
          material = yield materialService.getMaterialList(params);
          break;
        case '1':
          tips = yield materialService.getMaterialList(params);
          break;
        case '2':
          preservices = yield materialService.getMaterialList(params);
          break;
        case '3':
          paper = yield materialService.getMaterialList(params);
          break;
        default:
          tips = yield materialService.getMaterialList(tipsParams);
          material = yield materialService.getMaterialList(materialsParams);
          paper = yield materialService.getMaterialList(paperParams);
          preservices = yield materialService.getMaterialList(preservicesParams);
      }
      res.json({
        tips,
        material,
        paper,
        preservices
      });
    } catch (error) {
      res.status(500).send({
        msg: 'get material failed',
        error
      });
    }
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})());

router.get('/materials/:id/view', (req, res) => {
  const id = req.params.id;
  console.log('/materials/:id/view', id);
  materialService.countViewMaterial(id).then(result => {
    res.json(result);
  }).catch(error => {
    res.status(500).send({
      msg: 'count view material failed',
      error
    });
  });
});

router.get('/materials/:id/download', (req, res) => {
  const id = req.params.id;
  console.log('/materials/:id/download', id);
  materialService.countDownloadMaterial(id).then(result => {
    res.json(result);
  }).catch(error => {
    res.status(500).send({
      msg: 'count view material failed',
      error
    });
  });
});

router.get('/materials/hot_companies', (req, res) => {
  const params = req.query;
  materialService.getHotCompany(params).then(result => {
    res.json(result);
  }).catch(error => {
    res.status(500).send({
      msg: 'get hot company failed',
      error
    });
  });
});