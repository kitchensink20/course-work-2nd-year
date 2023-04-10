const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    gender: {
        type: Boolean,
        required: true
    },
    dorm_id: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});

const Room = mongoose.model('Room', roomSchema, 'rooms');

async function getAllRooms(){
    let rooms = await Room.find({}).exec();
    return rooms;
}

module.exports = { getAllRooms }