const express = require('express')
const studentsRouter = express.Router();
const path = require('path');

studentsRouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../././views/index.html'));
});

module.exports = studentsRouter;