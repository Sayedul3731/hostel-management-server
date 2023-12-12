const { Schema, model } = require('mongoose')

const RoomsSchema = new Schema({
    "img": {
        type: String,
        required: true
    },
    "room_number": {
        type: Number,
        required: true
    },
    "total_seat": {
        type: Number,
        required: true
    },

    "description": {
        type: String,
        required: true
    }
})
const room = model('room', RoomsSchema)
module.exports = room;