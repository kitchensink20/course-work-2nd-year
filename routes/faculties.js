const express = require('express')
const facultiesRouter = express.Router();
const path = require('path');
const faculties = require('../models/faculties')

facultiesRouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../././views/index.html'));
});

facultiesRouter
    .route('/:facultyId')
    .delete(async (req, res) => {
        try {
            const faculty = req.body;
            console.log(faculty)
            //await faculties.deleteFaculty(faculty);
        } catch (error) {
            console.error(error);
        }
    });

module.exports = facultiesRouter;