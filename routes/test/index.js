const express = require('express');
const BaseModel = require('../../models/BaseModel')

var router = express.Router();

router.get('/baseModel/list', async function (req, res) {
    let data = await BaseModel.list()
    data.forEach(o => new BaseModel(o))
    res.send(data)
});

router.get('/baseModel/getById', async function (req, res) {
    if (!req.query.id) throw new Error('Has no ID in query')
    const data = await BaseModel.getById(req.query.id)
    data.forEach(o => new BaseModel(o))
    res.send(data)
});

router.post('/baseModel/create', async function (req, res) {
    const data = await BaseModel.create(req.body)
    res.send(new BaseModel(data[0].ID))
});

router.post('/baseModel/update', async function (req, res) {
    const data = await BaseModel.update(req.body)
    res.send(new BaseModel(data[0].ID))
});

module.exports = router;
