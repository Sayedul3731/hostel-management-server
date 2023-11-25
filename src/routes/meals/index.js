var express = require('express')
var router = express.Router();
const findAll = require('../../api/meals/controllers/findAll');
const meal = require('../../models/Meals');
const user = require('../../models/Users')

router.get('/meals', findAll);
router.get('/users', async(req, res) => {
    const result = await user.find()
    res.send(result)
});

router.get('/meals/:id', async (req, res) => {
    const id = req.params.id;
    const result = await meal.find({ _id: id })
    res.send(result)
})

router.post('/users', async (req, res) => {
    const newUser = new user(req.body);
    await newUser.save()
})

module.exports = router