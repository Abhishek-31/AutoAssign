const student = require('express').Router();
var bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Importing Student Model
const { studentModel } = require('../models/studentModel');

var jsonParser = bodyParser.json({ type: 'application/json' });

student.get('/signup', (req, res) => {
    res.render('student/signup-student');
});

student.get('/login', (req, res) => {
    res.render('student/login-student');
});

student.post('/signup', jsonParser, (req, res) => {
    /*
    {
        "rollNumber":
        "name":
        "email":
        "mobile":
        "password":
    }
    */
   var newStud = new studentModel(req.body);
   studentModel.findOne({rollNumber: req.body.rollNumber})
    .then((user) => {
        if(!user) {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(req.body.password, salt, function (err, hash) {
                    newStud.password = hash;
                    newStud.save().then((user) => {
                        res.send(user);
                    }).catch((e) => {
                        res.send(e);
                    });
                    // console.log('Coming out of Hash Function: ', newStud);
                });
            });
        } else {
            console.log(user);
            res.send('Student already exists!');
        }
    })
});

student.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/fail',
    failureFlash: true
})
);

student.get('/fail', (req, res) => {
    res.send('Failed to Login');
});

student.get('/dashboard', passport.authenticate('jwt', {session: false}), (req, res) => {
    console.log(req.user);
    res.send('Working');
});

student.get('/one', (req, res) => {
    res.send('Routing working');
});

module.exports = student;