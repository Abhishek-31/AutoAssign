const express = require('express');
const hbs = require('hbs');
var bodyParser = require('body-parser');

var studentRoutes = require('./routes/student');
var facultyRoutes = require('./routes/faculty');
var miscRoutes = require('./routes/misc');

var app = express();

app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.static(__dirname + '/views'));

app.use('/faculty', facultyRoutes);
app.use('/student', studentRoutes);
app.use('/', miscRoutes);

app.get('/', (req, res) => {
    res.send('Site Up!');
});

app.listen(3000, () => {
    console.log('Port Up and running');
});