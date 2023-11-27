const { Schema, model } = require("mongoose");

const RequestedMealsSchema = new Schema({
    "like": {
        type: Number,
        required: true
    },
    "reviews": {
        type: Number,
        required: true
    },
    "status": {
        type: String,
        required: true
    },
    "title":{
        type: String,
        required: true
    },
    "userEmail":{
        type: String,
        required: true
    },
    "userName":{
        type: String,
        required: true
    }
})

const requestedMeal = model("requestedMeal", RequestedMealsSchema)
module.exports = requestedMeal;