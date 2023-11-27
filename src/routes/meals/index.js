var express = require('express')
var router = express.Router();
const findAll = require('../../api/meals/controllers/findAll');
const meal = require('../../models/Meals');
const upcomingMeal = require('../../models/UpcomingMeals')
const requestedMeal = require('../../models/RequestedMeals')
const user = require('../../models/Users');
const package = require('../../models/packages')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

router.get('/meals', findAll);
router.get('/meals/:email', async (req, res) => {
    const result = await meal.find({ adminEmail: req.params.email })
    res.send(result)
})
// payment intent 
router.post('/create-payment-intent', async (req, res) => {
    const { price } = req.body;
    const amount = parseInt(price * 100);
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        payment_method_types: ['card']
    });
    res.send({
        clientSecret: paymentIntent.client_secret
    })
})
router.get('/upcomingMeals', async (req, res) => {
    const result = await upcomingMeal.find();
    res.send(result)
})

router.post('/meals', async (req, res) => {
    const newMeal = new meal(req.body);
    const result = await newMeal.save();
    res.send(result)
})
router.post('/upcomingMeals', async (req, res) => {
    const newUpcomingMeal = new upcomingMeal(req.body);
    const result = await newUpcomingMeal.save();
    res.send(result)
})

// requestedMeal post here 
router.post('/requestedMeals', async (req, res) => {
    const newRequestedMeal = new requestedMeal(req.body);
    const result = await newRequestedMeal.save();
    console.log('requested meal', result);
    res.send(result)
})

router.get('/users', async (req, res) => {
    const result = await user.find()
    res.send(result)
});
router.get('/users/:text', async (req, res) => {
    const result = await user.findOne({
        $or: [
            { name: req.params.text },
            { email: req.params.text },
        ]
    })
    res.send([result])
});

// package data get 
router.get('/packages/:type', async (req, res) => {
    const result = await package.findOne({title: req.params.type})
    res.send(result)
});

router.get('/meals/meal/:id', async (req, res) => {
    const id = req.params.id;
    const result = await meal.findOne({ _id: id })
    res.send(result)
})

router.delete('/meals/:id', async (req, res) => {
    const id = req.params.id;
    const result = await meal.deleteOne({ _id: id })
    res.send(result)
})
router.patch('/meals/:id', async (req, res) => {
    const id = req.params.id;
    const updateMeal = req.body;
    const result = await meal.updateOne({ _id: id }, {
        $set: {
            title: updateMeal.title,
            category: updateMeal.category,
            price: updateMeal.price,
            image: updateMeal.image,
            like: updateMeal.like,
            rating: updateMeal.rating,
            reviews: updateMeal.reviews,
            adminEmail: updateMeal.adminEmail,
            adminName: updateMeal.adminName,
            Ingredients: updateMeal.Ingredients,
            Description: updateMeal.Description,
            time: updateMeal.time
        },
        $inc: { like: 1 }
    })
    res.send(result)
})
router.get('/users/admin/:email', async (req, res) => {
    const adminUser = await user.findOne({ email: req.params.email });
    let admin = false;
    if (adminUser) {
        admin = adminUser?.role === 'Admin'
    }
    res.send({ admin })
})

router.post('/users', async (req, res) => {
    const newUser = new user(req.body);
    await newUser.save()
})
router.get('/users/:email', async (req, res) => {
    console.log('user email', req.params.email);
   const result = await user.findOne({email: req.params.email})
   console.log('user', result);
   res.send(result)
})
router.patch('/users/admin/:id', async (req, res) => {
    const result = await user.updateOne({ _id: req.params.id }, {
        $set: {
            role: 'Admin'
        }
    })
    res.send(result)
})
// user badge update after purchasing a package 
router.patch('/users/:email', async (req, res) => {
    const badgeName = req.body;
    const result = await user.updateOne({ email: req.params.email }, {
        $set: {
            Badge: badgeName.badge
        }
    })
    res.send(result)
})

module.exports = router