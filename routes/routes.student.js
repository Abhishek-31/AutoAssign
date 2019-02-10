const student = require('express').Router();
var bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Importing Student Model
const { studentModel } = require('../models/studentModel');
const {authenticate, studentLoggedIn} = require('./../config/isLoggedIn');

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
   var newStud = new studentModel({...req.body, mobile: 12345});
   studentModel.findOne({rollNumber: req.body.rollNumber})
    .then((user) => {
        if(!user) {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(req.body.password, salt, function (err, hash) {
                    newStud.password = hash;
                    newStud.save().then((user) => {
                        res.redirect('login');
                    }).catch((e) => {
                        res.redirect('signup');
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

student.post('/login', authenticate, (req, res) => {
    res.send('one');
});

student.get('/fail', (req, res) => {
    res.send('Failed to Login');
});

student.get('/dashboard', studentLoggedIn, (req, res) => {
    console.log('Student Dashboard: ', req.user[0]);
    res.render('student/home-student', {user: req.user[0]});
});

student.get('/submit', studentLoggedIn, (req, res) => {
    console.log('Student Submission: ', req.user[0]);
    res.render('student/pending-assignments');
});

student.get('/one', (req, res) => {
    res.send('Routing working');
});

module.exports = student;