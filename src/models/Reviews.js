const { Schema, model } = require("mongoose");

const ReviewsSchema = new Schema({
    "review": {
        type: String,
        required: true
    },
    "userName": {
        type: String
    },
    "userEmail": {
        type: String,
        required: true
    },
    "mealId": {
        type: String
    },
    "title": {
        type: String,
        required: true
    },
    "like": {
        type: Number,
        required: true
    },
    "reviews": {
        type: String,
        required: true
    },
    "time" :{
        type: Date
    },
    "rating": {
        type: Number
    },
    "price": {
        type: Number,
        required: true
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
    }
})

const review = model("review", ReviewsSchema)
module.exports = review;