const mongoose = require('mongoose');

const dormitorySchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true,
        unique: true
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

async function deleteDorm(dorm){
    await Dormitory.findByIdAndDelete(dorm._id);
}

async function updateDorm(updatedDorm){
    let dormId = await findDormIdByNumber(updatedDorm.number);
    await Dormitory.findByIdAndUpdate(dormId, { number: updatedDorm.number, dorm_commandant_name: updatedDorm.dorm_commandant_name, faculty_id: updatedDorm.faculty_id })
}

async function createDorm(dorm) {
    const newDorm = new Dormitory(dorm);
    await newDorm.save();
    return newDorm;
}

async function findDormIdByNumber(dormNumber) {
    let dorm = await Dormitory.findOne({ number: dormNumber });
    return dorm._id;
}

module.exports = { getAllDorms, deleteDorm, updateDorm, createDorm }