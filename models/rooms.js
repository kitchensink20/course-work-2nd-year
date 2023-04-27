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
    },
    ocuppied: {
        type: Number,
        required: true,
        default: 0
    }
});

const Room = mongoose.model('Room', roomSchema, 'rooms');

async function getAllRooms(){
    let rooms = await Room.find({}).exec();
    return rooms;
}

async function deleteRoom(room){
    await Room.findByIdAndDelete(room._id);
}

async function updateRoom(updatedRoom){
    const roomId = await findRoomIdByRoomNumber(updatedRoom.number, updatedRoom.dorm_id);
    await Room.findByIdAndUpdate(roomId, 
        { number: updatedRoom.number, 
            capacity: updatedRoom.capacity,
            gender: updatedRoom.gender,
            dorm_id: updatedRoom.dorm_id,
            ocuppied: updatedRoom.ocuppied });
}

async function createRoom(room) {
    const newRoom = new Room(room);
    await newRoom.save();
    return newRoom;
}

async function incrementRoomOccupacity(room_id){
    await Room.findByIdAndUpdate(room_id, { $inc: { ocuppied: 1 } });
}

async function findRoomIdByRoomNumber(roomNumber, dormId){
    let room = await Room.findOne({ number: roomNumber, 
        dorm_id: dormId });
    return room._id;
}

module.exports = { getAllRooms, deleteRoom, updateRoom, createRoom, incrementRoomOccupacity }