const { Schema, model } = require("mongoose");

const UserProfileSchema = new Schema({
    "address": {
        type: String,
        required: true
    },
    "email": {
        type: String,
        required: true
    },
    "birth": {
        type: String,
        required: true
    },
    "fathersName":{
        type: String,
        required: true
    },
    "mothersName":{
        type: String,
        required: true
    },
    "fullName":{
        type: String,
        required: true
    },
    "gender":{
        type: String,
        required: true
    },
    "idNumber":{
        type: Number,
        required: true
    },
    "university":{
        type: String,
        required: true
    },
    "nationality":{
        type: String,
        required: true
    },
    "marital":{
        type: String,
        required: true
    },
    "phone":{
        type: String,
        required: true
    }
})

const userProfile = model("userProfile", UserProfileSchema)
module.exports = userProfile;