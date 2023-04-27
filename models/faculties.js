const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    head_of_selection_comittee_name: {
        type: String,
        required: true
    }
});

const Faculty = mongoose.model('Faculty', facultySchema, 'faculties');

async function getAllFaculties(){
    let faculties = await Faculty.find({}).exec();
    return faculties;
}

async function deleteFaculty(faculty){
    await Faculty.findByIdAndDelete(faculty._id);
}

async function updateFaculty(updatedFaculty){
    let facultyId = await findFacultyIdByName(updatedFaculty.name);
    await Faculty.findByIdAndUpdate(facultyId, 
        { name: updatedFaculty.name, 
            head_of_selection_comittee_name: updatedFaculty.head_of_selection_comittee_name });
}

async function createFaculty(faculty) {
    const newFaculty = new Faculty(faculty);
    await newFaculty.save();
    return newFaculty;
}

async function findFacultyIdByName(facultyName){
    let faculty = await Faculty.findOne({ name: facultyName }) 
    return faculty._id;
}

module.exports = { getAllFaculties, deleteFaculty, updateFaculty, createFaculty }