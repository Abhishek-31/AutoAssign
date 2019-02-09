const faculty = require('express').Router();
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Importing Faculty Model
const {facultyModel} = require('../models/facultyModel');

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
   console.log('Inside Post Request');
   var newFac = new facultyModel(req.body);
   facultyModel.findOne({email: req.body.email})
    .then((user) => {
        if(!user) {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(req.body.password, salt, function (err, hash) {
                   newFac.password = hash;
                    newFac.save().then((user) => {
                        res.redirect('dashboard');
                    }).catch((e) => {
                        res.redirect('login');
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

faculty.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/fail',
    failureFlash: true
})
);

faculty.get('/dashboard',  (req, res) => {
    console.log(req.user);
    res.send('Working');
});

faculty.get('/test', (req, res) => {
    res.send('Faculty Route Working!');
});

// var isLoggedIn = (req, res, next) => {
//     passport.authenticate('jwt', { session: false }, (err, user, info) => {
//         if (user) {
//             req.user = user;
//             next();
//         } else if (info) {
//             // next();                                                                 // TODO: Do something for displaying error messages
//         }
//     })
// }


module.exports = faculty;