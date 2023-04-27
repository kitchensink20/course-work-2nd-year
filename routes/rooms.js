const express = require('express')
const roomsRouter = express.Router();
const path = require('path');
const rooms = require('../models/rooms');

roomsRouter
    .route('/')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '../././views/index.html'));
    })
    .post(async (req, res) => {
        try {
            let room = {
                number: req.body.roomNumber,
                capacity: req.body.roomCapacity,
                gender: req.body.roomGender == 'false'? false: true,
                dorm_id: req.body.dormId,
                ocuppied: 0
            };
            console.log(room);
            await rooms.createRoom(room);
            res.redirect('/rooms');
        } catch {
            console.log('Creating room error.');
            res.redirect('/rooms');
        }
    })
    .put(async (req, res) => {
        try{
            let updatedRoom = {
                number: req.body.roomNumber,
                capacity: req.body.roomCapacity,
                gender: req.body.roomGender == 'false'? false: true,
                dorm_id: req.body.dormId,
                ocuppied: req.body.roomOcuppacity
            }
            await rooms.updateRoom(updatedRoom);
            res.redirect('/rooms');
        } catch {
            console.log('Updating room error.');
            res.redirect('/rooms');
        }
    });

roomsRouter
    .route('/:roomId')
    .delete(async (req, res) => {
        try {
            const room = req.body;
            await rooms.deleteRoom(room);
        } catch (error) {
            console.log('Deleting room error.');
            console.error(error);
        }
    });

module.exports = roomsRouter;