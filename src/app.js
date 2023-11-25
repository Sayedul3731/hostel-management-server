const express = require('express');
const app = express();
const connectDB = require('./db/connectDB')
const applyMiddleware = require('./middlewares/applyMiddleware');
require('dotenv').config();
const port = process.env.PORT || 5000;
const mealsRoutes = require('./routes/meals')

applyMiddleware(app)
app.use(mealsRoutes);


// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://<username>:<password>@cluster0.dvnw110.mongodb.net/?retryWrites=true&w=majority";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);


app.get("/health", (req, res) => {
    res.send('Hostel Management system is running')
})

app.all("*", (req, res, next) => {
    const error = new Error(`The requested url is invalid: [${req.url}]`);
    error.status = 404;
    next(error)
})

app.use((err, req,res, next) => {
    res.status(err.status || 500).json({
        message: err.message
    })
})

const main = async() => {
    await connectDB();
    app.listen(port, () => {
        console.log(`Hostel management system is running port on: ${port}`);
    })
}
main()