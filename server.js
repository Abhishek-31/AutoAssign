// importing modules
const express = require('express');
const hbs = require('hbs');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');

// importing Routes
var studentRoutes = require('./routes/routes.student');
var facultyRoutes = require('./routes/routes.faculty');
var miscRoutes = require('./routes/routes.misc');

// importing DB Models
var {StudentModel} = require('./models/studentModel');
var {FacultyModel} = require('./models/facultyModel');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/AutoAssign', { useNewUrlParser: true, useCreateIndex: true })

var app = express();

// Templating Configurations
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/views'));

// Body Parser Configuations for POST requests
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

// Routing Configurations
app.use('/faculty', facultyRoutes);
app.use('/student', studentRoutes);
app.use('/', miscRoutes);

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(3000, () => {
    console.log('Port Up and running');
});