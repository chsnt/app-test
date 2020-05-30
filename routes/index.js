const express = require('express');
const baseModel = require('./test/baseModel');

var router = express.Router();

/* GET home page. */
router.get('/test/baseModel/list', async function(req, res, next) {
  const data = await baseModel.list()
  res.send(data)
});

router.get('/test/baseModel/getById', async function(req, res, next) {
  if(!req.query.id) throw new Error('Has no ID in query')
  const data = await baseModel.getById(req.query.id)
  res.send(data)
});

router.post('/test/baseModel/create', async function(req, res, next) {
  const data = await baseModel.create(req.body)
  res.send(data)
});

router.post('/test/baseModel/update', async function(req, res, next) {
  const data = await baseModel.update(req.body)
  res.send(data)
});

module.exports = router;
