const { Schema, model } = require("mongoose");

const MealsSchema = new Schema({
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
})

const meal = model("meal", MealsSchema)
module.exports = meal;