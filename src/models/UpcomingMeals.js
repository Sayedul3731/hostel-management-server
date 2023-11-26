const { Schema, model } = require("mongoose");

const UpcomingMealsSchema = new Schema({
    "title": {
        type: String,
        required: true
    },
    "time" :{
        type: Date,
        default: Date.now
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
})

const upcomingMeal = model("upcomingMeal", UpcomingMealsSchema)
module.exports = upcomingMeal;