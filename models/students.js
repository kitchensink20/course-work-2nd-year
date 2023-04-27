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

async function deleteStudent(student){
    await Student.findByIdAndDelete(student._id);
}

async function updateStudent(updatedStudent){
    await Student.findOneAndUpdate({ full_name: updatedStudent.full_name }, 
        { gender: updatedStudent.gender,
        benefit: updatedStudent.benefit,
        faculty_id: updatedStudent.faculty_id,
        room_id: updatedStudent.room_id });
}

async function createStudent(student) {
    const newStudent = new Student(student);
    await newStudent.save();
    return newStudent;
}

module.exports = { getAllStudents, deleteStudent, updateStudent, createStudent }