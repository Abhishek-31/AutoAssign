const faculty = require('express').Router();
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
// Importing Faculty Model
const { facultyModel } = require('../models/facultyModel');
const {TeacherLoggedIn, authenticate} = require('./../config/isLoggedIn');

var jsonParser = bodyParser.json({ type: 'application/json' });

faculty.get('/signup', (req, res) => {
    res.render('faculty/signup-faculty');
});

faculty.get('/login', (req, res) => {
    res.render('faculty/login-faculty');
});

faculty.post('/signup', jsonParser, (req, res) => {
    /*
    {
        "department":
        "name":
        "email":
        "phone":
        "password":
    }
    */
    console.log('Inside Sign Up Post Request');
    var newFac = new facultyModel(req.body);
    facultyModel.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(req.body.password, salt, function (err, hash) {
                        newFac.password = hash;
                        newFac.save().then((user) => {
                            res.redirect('login');
                        }).catch((e) => {
                            res.redirect('signup');
                        });
                        console.log('Coming out of Hash Function: ', newFac);
                    });
                });
            } else {
                console.log(user);
                res.send('Faculty is already registered!');
            }
        });
});

// faculty.post('/login', passport.authenticate('local'), (req, res) => {
//     console.log('Out of Passport Middleware - Login');
//     res.status(200).send(req.session.passport.user);
// });

faculty.get('/dashboard', TeacherLoggedIn, (req, res) => {
    console.log('Request.User: ', req.user[0]);
    res.render('faculty/home-faculty', {user: req.user[0]});
});

faculty.get('/newassignment', TeacherLoggedIn, (req, res) => {
    res.render('faculty/addassign-faculty', {user: req.user});
});

faculty.get('/fetchassignments', TeacherLoggedIn, (req, res) => {
    res.send(req.user.assignments);
});

faculty.post('/newassign', jsonParser, (req, res) => {
    facultyModel.findOne({ email: 'utkarshsingh369@gmail.com' })
        .then((user) => {
            if (!user) {
                return res.send('Could not find user with given name')
            }
            user.assignments.push(req.body);
            user.save().then((u) => res.send('Saved'));
        })
    res.send('Some error occured');
});

faculty.get('/test', (req, res) => {
    res.send('Faculty Route Working!');
});

faculty.post('/login', authenticate, (req, res) => {
    res.cookie('x-auth', req.token, { maxAge: 900000, httpOnly: true });
    res.send('one');
});

module.exports = faculty;

