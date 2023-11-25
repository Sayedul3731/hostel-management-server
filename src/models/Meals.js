const { Schema, model } = require("mongoose");

const MealsSchema = new Schema({
    "title": {
        type: String,
        required: true
    },
    "price": {
        type: Number,
        required: true
    },
    "image": {
        type: String,
        required: true
    },
    "rating": {
        type: Number,
        required: true
    },
})

const meal = model("meal", MealsSchema)
module.exports = meal;