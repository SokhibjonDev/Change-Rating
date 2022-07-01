const express = require('express')
const router = express.Router()
const Mongo = require('../model/Mongo')

router.get('/add', async (req, res) => {
    const people = await Mongo.find()
    const result = people.reduce((total, value) => {
        total[value.group] = (total[value.group] || 0) + 1;
        return total;
   }, {});
    res.render('addPeople',{
        result
    })
})

router.post('/add', async (req, res) => {
    const {
        name,
        surname,
        number,
        group,
        month,
        score
    } = req.body

    const people = new Mongo({
        name,
        surname,
        number,
        group,
        month,
        score
    })

    await people.save()
    res.redirect('/')
})

router.get('/:id', async (req, res) => {
    const people = await Mongo.find()
    const result = people.reduce((total, value) => {
        total[value.group] = (total[value.group] || 0) + 1;
        return total;
   }, {});
    const peopleFind = await Mongo.findById(req.params.id)
    res.render('people', {
        people: peopleFind,
        result
    })
})

router.post('/score/:id', async (req, res ) => {
    const peopleScore = {
        name: req.body.name,
        surname: req.body.surname,
        score: (+req.body.oldScore + +req.body.score),
        number: req.body.number,
        group: req.body.group,
        month: req.body.month
    }
    const addScore = await Mongo.findByIdAndUpdate(req.params.id, peopleScore)
    res.redirect('/')
})

router.get('/peoples/:month', async (req, res) => {
    const people = await Mongo.find()
    const findPeople = await Mongo.find({month: {$eq: req.params.month}}).sort({score: -1})
    const result = people.reduce((total, value) => {
        total[value.group] = (total[value.group] || 0) + 1;
        return total;
   }, {});
   const peoples = await Mongo.find()
    const sum = []
    let num = peoples.length / 10
    for (let i = 0; i < num; i++) {
        sum.push(i + 1)
    }
    res.render('month', {
        findPeople,
        result,
        sum
    })
})

router.get('/del/:id', async (req, res) => {
    await Mongo.findByIdAndDelete(req.params.id)
    res.redirect('/')
})



module.exports = router