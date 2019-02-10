const faculty = require('express').Router();
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
// Importing Faculty Model
const { facultyModel } = require('../models/facultyModel');

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

faculty.get('/dashboard', passport.authenticate('jwt'), (req, res) => {
    console.log(req.user);
    res.render('faculty/home-faculty');
});

faculty.get('/newassignment', (req, res) => {
    res.render('faculty/addassign-faculty');
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

module.exports = faculty;


faculty.post('/login', function (req, res, next) {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        console.log('Inside Middleware');
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user: user,
                err: err
            });
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }
            // generate a signed son web token with the contents of user object and return it in the response
            console.log(user);
            const token = jwt.sign({
                _id: user._id,
                email: user.email
            }, 'jwt-secret');
            req.token = token;
            console.log('Token Formation');
            // return res.json({ user, token });
            return res.redirect('dashboard');
        });
    })(req, res);
});