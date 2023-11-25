var express = require('express')
var router = express.Router();
const meal = require('../../models/Meals')
const findAll = require('../../api/meals/controllers/findAll')


router.get('/meals', findAll);
module.exports = router