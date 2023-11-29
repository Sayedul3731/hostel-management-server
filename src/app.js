const express = require('express');
const app = express();
const connectDB = require('./db/connectDB')
const applyMiddleware = require('./middlewares/applyMiddleware');
require('dotenv').config();
const port = process.env.PORT || 5000;
const mealsRoutes = require('./routes/meals')

applyMiddleware(app)
app.use(mealsRoutes);

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