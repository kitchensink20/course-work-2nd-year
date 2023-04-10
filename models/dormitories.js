const mongoose = require('mongoose');

const dormitorySchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true
    },
    dorm_commandant_name: {
        type: String,
        required: true
    },
    faculty_id: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});

const Dormitory = mongoose.model('Dormitory', dormitorySchema, 'dormitories');

async function getAllDorms(){
    let dorms = await Dormitory.find({}).exec();
    return dorms;
}

module.exports = { getAllDorms }