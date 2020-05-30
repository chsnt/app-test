const express = require('express');
const EventModel  = require('../models/EventModel')

var router = express.Router();

router.get('/events/list', async function (req, res) {
    let data = await EventModel .list()
    data.forEach(o => new EventModel (o))
    res.send(data)
});

router.get('/events/getById', async function (req, res) {
    if (!req.query.id) throw new Error('Has no ID in query')
    const data = await EventModel .getById(req.query.id)
    data.forEach(o => new EventModel (o))
    res.send(data)
});

router.post('/events/create', async function (req, res) {
    const data = await EventModel .create(req.body)
    res.send(new EventModel (data[0].ID))
});

router.post('/events/update', async function (req, res) {
    const data = await EventModel .update(req.body)
    res.send(new EventModel (data[0].ID))
});

module.exports = router;
