const express = require('express');
const cors = require('cors');

const applyMiddleware = (app) => {
    app.use(cors({
        origin: [
            'http://localhost:5173',
            'https://hostel-management-9654d.web.app'
        ]
    }))
    app.use(express.json())
}

module.exports = applyMiddleware;