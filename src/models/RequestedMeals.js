const { Schema, model } = require("mongoose");

const RequestedMealsSchema = new Schema({
    "title": {
        type: String,
        required: true
    },
    "time" :{
        type: Date
    },
    "reviews" :{
        type: Number
    },
    "rating": {
        type: Number
    },
    "price": {
        type: Number,
        required: true
    },
    "like": {
        type: Number
    },
    "image": {
        type: String,
        required: true
    },
    "category": {
        type: String,
        required: true
    },
    "adminName": {
        type: String,
        required: true
    },
    "adminEmail": {
        type: String,
        required: true
    },
    "Description": {
        type: String
    },
    "Ingredients": {
        type: String
    },
    "status": {
        type: String,
        required: true
    },
    "userEmail": {
        type: String,
        required: true
    },
    "userName": {
        type: String,
        
    },
})

const requestedMeal = model("requestedMeal", RequestedMealsSchema)
module.exports = requestedMeal;