const express = require('express')
const dormsRouter = express.Router();
const path = require('path');

dormsRouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../././views/index.html'));
});

module.exports = dormsRouter;