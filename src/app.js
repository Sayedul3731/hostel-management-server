const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;


app.use(cors())
app.use(express.json())

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

app.listen(port, () => {
    console.log(`Hostel management system is running port on: ${port}`);
})