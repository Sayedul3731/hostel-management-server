var express = require('express')
var router = express.Router();
const meal = require('../../models/Meals');
const upcomingMeal = require('../../models/UpcomingMeals')
const requestedMeal = require('../../models/RequestedMeals')
const user = require('../../models/Users');
const package = require('../../models/packages');
const review = require('../../models/Reviews')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const jwt = require('jsonwebtoken');

// jwt create here 
router.post('/jwt', async(req, res) => {
    const user = req.body;
    const token = jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, {expiresIn: '1h'})
    res.send({token})
})
// token verify here 
const verifyToken = (req, res, next) => {
    if(!req.headers.authorization){
        return res.status(401).send({message: 'unauthorized access'})
    }
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, decoded) => {
        if(err){
            return res.status(401).send({message: 'unauthorized access'})
        }
        req.decoded = decoded;
        next()
    })
}
// all meals get here 
router.get('/meals', async(req,res) => {
    const page = parseInt(req.query.page)
    const size = parseInt(req.query.size)
    const result = await meal.find()
    .skip(page * size)
    .limit(size)
    res.send(result)
});

// specific user meal get here by query eamil 
router.get('/meals/:email', async (req, res) => {
    const result = await meal.find({ adminEmail: req.params.email })
    res.send(result)
})
// reviews get here 
router.get('/reviews/:id', async (req, res) => {
    const page = parseInt(req.query.page)
    const size = parseInt(req.query.size)
    const result = await review.find({
        $or: [
            { mealId: req.params.id },
            {userEmail: req.params.id}
        ]
    })
    .skip(page * size)
    .limit(size)
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

// all upcoming meals get here 
router.get('/upcomingMeals', async (req, res) => {
    const page = parseInt(req.query.page)
    const size = parseInt(req.query.size)
    const result = await upcomingMeal.find()
    .skip(page * size)
    .limit(size)
    res.send(result)
})
// all reviews meals get here 
router.get('/reviews', async (req, res) => {
    const page = parseInt(req.query.page)
    const size = parseInt(req.query.size)
    const result = await review.find()
    .skip(page * size)
    .limit(size)
    res.send(result)
})
// upcoming meal post here 
router.post('/upcomingMeals', async (req, res) => {
    const newUpcomingMeal = new upcomingMeal(req.body);
    const result = await newUpcomingMeal.save();
    res.send(result)
})
// reviews post here 
router.post('/reviews', async (req, res) => {
    const newReview = new review(req.body);
    const result = await newReview.save();
    res.send(result)
})

// new meal post here 
router.post('/meals', async (req, res) => {
    console.log('new meal', req.body);
    const newMeal = new meal(req.body);
    const result = await newMeal.save();
    console.log('new meal add result', result);
    res.send(result)
})


// requested Meal post here 
router.post('/requestedMeals', async (req, res) => {
    const newRequestedMeal = new requestedMeal(req.body);
    const result = await newRequestedMeal.save();
    res.send(result)
})
// requested meal get here by specific user 
router.get('/requestedMeals/:email', async(req, res) =>{
    const page = parseInt(req.query.page)
    const size = parseInt(req.query.size)
    const result = await requestedMeal.find({userEmail: req.params.email})
    .skip(page * size)
    .limit(size)
    res.send(result)
})
//all requested meals get here 
router.get('/requestedMeals', async(req, res) =>{
    const page = parseInt(req.query.page)
    const size = parseInt(req.query.size)
    const result = await requestedMeal.find()
    .skip(page * size)
    .limit(size)
    res.send(result)
})
// requested data  update here 
router.patch('/requestedMeals/:id', async (req, res) => {
    const id = req.params.id;
    const updateInfo = req.body;
    const result = await requestedMeal.updateOne({ _id: id },updateInfo);
    res.send(result);
});

// all users find/get here 
router.get('/users',verifyToken, async (req, res) => {
    const page = parseInt(req.query.page)
    const size = parseInt(req.query.size)
    const result = await user.find()
    .skip(page * size)
    .limit(size)
    res.send(result)
});

// a user get by user name or email 
router.get('/users/:text', async (req, res) => {
    const result = await user.findOne({
        $or: [
            { name: req.params.text },
            { email: req.params.text }
        ]
    })
    res.send([result])
});
// a user get by user name or email 
router.get('/requestedMeals/:text', async (req, res) => {
    const result = await requestedMeal.findOne({
        $or: [
            { userName: req.params.text },
            { userEmail: req.params.text }
        ]
    })
    res.send([result])
});

// package data get 
router.get('/packages/:type', async (req, res) => {
    const result = await package.findOne({ title: req.params.type })
    res.send(result)
});
// a meal get here by id 
router.get('/meals/meal/:id', async (req, res) => {
    const id = req.params.id;
    const result = await meal.findOne({ _id: id })
    res.send(result)
})
// a meal delete here by id 
router.delete('/meals/:id', async (req, res) => {
    const id = req.params.id;
    const result = await meal.deleteOne({ _id: id })
    res.send(result)
})
// a upcoming meal delete here by id 
router.delete('/upcomingMeals/:id', async (req, res) => {
    const id = req.params.id;
    const result = await upcomingMeal.deleteOne({ _id: id })
    res.send(result)
})
// reviews data delete here 
router.delete('/reviews/:id', async (req, res) => {
    const id = req.params.id;
    const result = await review.deleteOne({ _id: id })
    res.send(result)
})
// requested meal delete 
router.delete('/requestedMeals/:id', async (req, res) => {
    const id = req.params.id;
    const result = await requestedMeal.deleteOne({ _id: id })
    res.send(result)
})
// a meal update here by id 
router.patch('/meals/:id', async (req, res) => {
    const id = req.params.id;
    const updateMeal = req.body;

    const updateDoc = {
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
            time: updateMeal.time,
        },
    };
    if (id && updateMeal.lk === 1) {
        updateDoc.$inc = { like: 1 };
    }
    if (id && updateMeal.rev === 1) {
        updateDoc.$inc = { ...updateDoc.$inc, reviews: 1 };
    }

    const result = await meal.updateOne({ _id: id }, updateDoc);
    res.send(result);
});

// a upcomingMeal update here 
router.patch('/upcomingMeals/:id', async (req, res) => {
    const id = req.params.id;
    const result = await upcomingMeal.updateOne({ _id: id }, {
        $inc: {
            like: 1
        }
    });
    res.send(result);
});
// reviews data  update here 
router.patch('/reviews/:id', async (req, res) => {
    const id = req.params.id;
    const updateInfo = req.body;
    const result = await review.updateOne({ _id: id },updateInfo);
    res.send(result);
});


// identify or get a admin here by email 
router.get('/users/admin/:email', async (req, res) => {
    const adminUser = await user.findOne({ email: req.params.email });
    let admin = false;
    if (adminUser) {
        admin = adminUser?.role === 'Admin'
    }
    res.send({ admin })
})

// new user save to database here 
router.post('/users', async (req, res) => {
    const newUser = new user(req.body);
    await newUser.save()
})
// get a user by using user email 
router.get('/users/:email', async (req, res) => {
    const result = await user.findOne({ email: req.params.email })
    res.send(result)
})
// make admin here 
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