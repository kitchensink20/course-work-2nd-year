const express = require('express')
const studentsRouter = express.Router();
const path = require('path');
const students = require('../models/students');
const rooms = require('../models/rooms');

studentsRouter
    .route('/')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '../././views/index.html'));
    })
    .post(async (req, res) => {
        try {
            let student = {
                full_name: req.body.studentFullName,
                gender: req.body.studentGender == 'true'? true : false,
                benefit: req.body.studentBenefit == 'true'? true : false,
                faculty_id: req.body.facultyId,
                dorm_id: req.body.dormId,
                room_id: req.body.roomId
            }
            await students.createStudent(student);
            await rooms.incrementRoomOccupacity(req.body.roomId);
            res.redirect('/students');
        } catch {
            res.redirect('/students');
        }
    })
    .put(async (req, res) => {
        try{
            let updatedStudent = {
                full_name: req.body.studentFullName,
                gender: req.body.studentGender == 'true'? true : false,
                benefit: req.body.studentBenefit == 'true'? true : false,
                faculty_id: req.body.facultyId,
                dorm_id: req.body.dormId,
                room_id: req.body.roomId
            }
            console.log(updatedStudent)
            await students.updateStudent(updatedStudent);
            res.redirect('/students');
        } catch {
            console.log('Updating student error.');
            res.redirect('/students');
        }
    });

studentsRouter
    .route('/:studentId')
    .delete(async (req, res) => {
        try {
            const student = req.body;
            await students.deleteStudent(student);
        } catch (error) {
            console.error(error);
        }
    });

module.exports = studentsRouter;