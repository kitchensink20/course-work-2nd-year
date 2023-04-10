const express = require('express');
const path = require('path');
const db = require('./models/db-connection');

//routers
const facultiesRouter = require('./routes/faculties');
const dormsRouter = require('./routes/dormitories');
const roomsRouter = require('./routes/rooms');
const studentsRouter = require('./routes/students');
const mainPageRouter = require('./routes/main-page');
const dbDataRouter = require('./routes/db-data');

const app = express();
const port = 8080;

db.once('open', () => {
    app.use(express.static(path.join(__dirname, 'public'))); 
    app.use('/faculties', facultiesRouter);
    app.use('/dorms', dormsRouter);
    app.use('/rooms', roomsRouter);
    app.use('/students', studentsRouter);
    app.use('/', mainPageRouter);
    app.use('/data', dbDataRouter);

    app.listen(port, () => 
        console.log('Server started on port ' + port + '.'));   
});