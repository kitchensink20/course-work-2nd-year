const mongoose = require('mongoose');

const connectionnURL = "mongodb+srv://alina_lyt:12345@cluster0.yhfiya7.mongodb.net/course_work2023?retryWrites=true&w=majority/";

mongoose.connect(connectionnURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    w: 'majority',
    j: true
});

const db = mongoose.connection;

db.once('open', () => 
    console.log('Connection to DB established.'));

db.on('error', console.error.bind(console, 'DB connection error: '));

db.on('disconnected', () => 
    console.log('The connection to the DB was stopped.'));

module.exports = db;