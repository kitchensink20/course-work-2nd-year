const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true
    },
    gender: {
        type: Boolean,
        required: true
    },
    benefit: {
        type: Boolean,
        required: true
    },
    faculty_id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    room_id: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});

const Student = mongoose.model('Student', studentSchema, 'students');

async function getAllStudents(){
    let students = await Student.find({}).exec();
    return students;
}

module.exports = { getAllStudents }