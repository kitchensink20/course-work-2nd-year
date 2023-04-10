const express = require('express');
const dbDataRouter = express.Router();
const students = require('../models/students');
const dormitories = require('../models/dormitories');
const rooms = require('../models/rooms');
const faculties = require('../models/faculties');

dbDataRouter.get('/faculties', async (req, res) => {
    let allFaculties = await faculties.getAllFaculties();
    res.json(allFaculties);
});

dbDataRouter.get('/rooms', async (req, res) => {
    let allRooms = await rooms.getAllRooms();
    res.json(allRooms);
});

dbDataRouter.get('/dorms', async (req, res) => {
    let allDorms = await dormitories.getAllDorms();
    res.json(allDorms);
});

dbDataRouter.get('/students', async (req, res) => {
    let allStudents = await students.getAllStudents();
    res.json(allStudents);
});

module.exports = dbDataRouter;