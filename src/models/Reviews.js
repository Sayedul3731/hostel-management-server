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
    }
})

const review = model("review", ReviewsSchema)
module.exports = review;