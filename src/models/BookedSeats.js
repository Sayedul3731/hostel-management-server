const { Schema, model } = require("mongoose");

const BookedSeatsSchema = new Schema({
    "room_number": {
        type: Number,
        required: true
    },
    "seat_no": {
        type: Number,
        required: true
    },
    "studentsEmail": {
        type: String,
        required: true
    }
})

const bookedSeat = model("bookedSeat", BookedSeatsSchema)
module.exports = bookedSeat;