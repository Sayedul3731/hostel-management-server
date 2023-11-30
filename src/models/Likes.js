const { Schema, model } = require("mongoose");

const LikeSchema = new Schema({
    "userEmail": {
        type: String,
        required: true
    },
    "mealId": {
        type: String,
        required: true
    }
})

const like = model("like", LikeSchema)
module.exports = like;