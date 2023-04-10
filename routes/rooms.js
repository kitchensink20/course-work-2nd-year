const express = require('express')
const roomsRouter = express.Router();
const path = require('path');

roomsRouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../././views/index.html'));
});

module.exports = roomsRouter;