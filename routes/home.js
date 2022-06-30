const express = require('express')
const router = express.Router()
const Mongo = require('../model/Mongo')


router.get('/', async (req, res) => {    
    const people = await Mongo.find().sort({ score: -1 }).limit(10)
    const sum = []
    let num = people.length / 10
    for (let i = 0; i < num; i++) {
        sum.push(i + 1)
    }
    const result = people.reduce((total, value) => {
        total[value.group] = (total[value.group] || 0) + 1;
        return total;
   }, {});
    res.render('index', {
        people,
        sum,
        result
    })
})

router.get('/:id', async (req, res) => {
    let page = +req.params.id
    let skip = (page - 1) * 10
    const people = await Mongo.find().sort({ score: -1, _id: 1 }).limit(10).skip(skip)
    const sum = []
    let num = people.length / 10
    for (let i = 0; i < num; i++) {
        sum.push(i + 1)
    }
    res.render('index', {
        people,
        sum
    })
})

router.get('/all/:search', async (req, res) => {
    const people = await Mongo.find().limit(10)
    .sort({score: -1})

    const peop = people.filter(item => item.name.toLowerCase().includes(req.params.search) || item.surname.toLowerCase().includes(req.params.search))
    res.send(peop)
})

module.exports = router