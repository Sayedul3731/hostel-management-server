const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    "name": {
        type: String,
        required: true
    },
    "email": {
        type: String,
        required: true
    },
    "Badge": {
        type: String,
        required: true
    },
    "role":{
        type: String
    }
})

const user = model("user", UserSchema)
module.exports = user;