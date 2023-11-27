const { Schema, model } = require("mongoose");

const ReviewsSchema = new Schema({
    "reviews": {
        type: String,
        required: true
    },
    "userName": {
        type: String
    },
    "userEmail": {
        type: String
    },
    "mealId": {
        type: String
    }
})

const review = model("review", ReviewsSchema)
module.exports = review;