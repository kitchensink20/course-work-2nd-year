const express = require('express')
const dormsRouter = express.Router();
const path = require('path');
const dorms = require('../models/dormitories');
const faculties = require('../models/faculties')

dormsRouter
    .route('/')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '../././views/index.html'));
    })
    .post(async (req, res) => {
        try {
            let dorm = {
                number: req.body.dormNumber,
                dorm_commandant_name: req.body.dormCommandantName,
                faculty_id: req.body.facultyId
            }
            console.log(dorm);
            await dorms.createDorm(dorm);
            res.redirect('/dorms');
        } catch {
            console.log('Creating dormitory error.');
            res.redirect('/dorms');
        }
    })
    .put(async (req, res) => {
        try{
            let updatedDormitory = {
                number: req.body.dormNumber,
                dorm_commandant_name: req.body.dormCommandantName,
                faculty_id: req.body.facultyId
            }
            await dorms.updateDorm(updatedDormitory);
            res.redirect('/dorms');
        } catch {
            console.log('Updating dormitory error.');
            res.redirect('/dorms');
        }
    });

dormsRouter
    .route('/:dormId')
    .delete(async (req, res) => {
        try {
            const dorm = req.body;
            await dorms.deleteDorm(dorm);
        } catch (error) {
            console.log('Deleting dormitory error.');
            console.error(error);
        }
    });

module.exports = dormsRouter;