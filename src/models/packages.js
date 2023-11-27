const { Schema, model } = require("mongoose");

const PackagesSchema = new Schema({
    "title": {
        type: String,
        required: true
    },
    "price": {
        type: Number,
        required: true
    },
    "details": {
        type: String,
        required: true
    }
})

const package = model("package", PackagesSchema)
module.exports = package;