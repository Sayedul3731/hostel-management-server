const { Schema, model } = require('mongoose')

const SeatsSchema = new Schema({
    "room_number": {
        type: Number,
        required: true
    },
    "seats":  [{
        img: String,
        students_name: String,
        students_email: String,
        seat_no: Number,
        status: String,
      }]
})
const seat = model('seat', SeatsSchema)
module.exports = seat;