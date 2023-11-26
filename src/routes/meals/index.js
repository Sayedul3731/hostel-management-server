var express = require('express')
var router = express.Router();
const findAll = require('../../api/meals/controllers/findAll');
const meal = require('../../models/Meals');
const upcomingMeal = require('../../models/UpcomingMeals')
const user = require('../../models/Users')

router.get('/meals', findAll);

router.post('/meals', async (req, res) => {
    const newMeal = new meal(req.body);
    console.log("new meal", newMeal);
    const result = await newMeal.save();
    res.send(result)
})
router.post('/upcomingMeals', async (req, res) => {
    const newUpcomingMeal = new upcomingMeal(req.body);
    const result = await newUpcomingMeal.save();
    res.send(result)
})

router.get('/users', async(req, res) => {
    const result = await user.find()
    res.send(result)
});
router.get('/users/:text', async(req, res) => {
    console.log(req.params.text);
    const result = await user.findOne({ $or: [
        { name: req.params.text },
        { email: req.params.text },
      ]} )
    res.send([result])
});

router.get('/meals/:id', async (req, res) => {
    const id = req.params.id;
    const result = await meal.find({ _id: id })
    res.send(result)
})
router.get('/users/admin/:email', async (req, res) => {
    console.log('admin email', req.params.email);

    const adminUser = await user.findOne({ email: req.params.email});
    let admin = false;
    if(adminUser){
        admin= adminUser?.role === 'Admin'
    }
    res.send({admin})
})

router.post('/users', async (req, res) => {
    const newUser = new user(req.body);
    await newUser.save()
})
router.patch('/users/admin/:id', async (req, res) => {
    const result = await user.updateOne({_id: req.params.id}, {
        $set: {
            role: 'Admin'
        }
    })
    res.send(result)
})

module.exports = router