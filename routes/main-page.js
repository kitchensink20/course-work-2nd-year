const express = require('express')
const mainPageRouter = express.Router();
const path = require('path');

mainPageRouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../././views/index.html'));
});

module.exports = mainPageRouter;