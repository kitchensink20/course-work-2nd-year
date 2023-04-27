const express = require('express')
const facultiesRouter = express.Router();
const path = require('path');
const faculties = require('../models/faculties');

facultiesRouter
    .route('/')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '../././views/index.html'));
    })
    .post(async (req, res) => {
        try{
            let faculty = {
                name: req.body.facultyName,
                head_of_selection_comittee_name: req.body.headOfSelectionComitteeName
            }
            await faculties.createFaculty(faculty);
            res.redirect('/faculties');
        } catch {
            console.log('Creating faculty error.');
            res.redirect('/faculties');
        }
    })
    .put(async (req, res) => {
        try{
            let updatedFaculty = {
                name: req.body.facultyName,
                head_of_selection_comittee_name: req.body.headOfSelectionComitteeName
            }
            await faculties.updateFaculty(updatedFaculty);
            res.redirect('/faculties');
        } catch {
            console.log('Updating faculty error.');
            res.redirect('/faculties');
        }
    });

facultiesRouter
    .route('/:facultyId')
    .delete(async (req, res) => {
        try {
            const faculty = req.body;
            await faculties.deleteFaculty(faculty);
        } catch (error) {
            console.log('Deleting faculty error.');
            console.error(error);
        }
    });

module.exports = facultiesRouter;