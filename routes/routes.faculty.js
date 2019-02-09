const faculty = require('express').Router();
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

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
   var newFac = new facultyModel(req.body);
   facultyModel.findOne({email: req.body.email})
    .then((user) => {
        if(!user) {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(req.body.password, salt, function (err, hash) {
                   newFac.password = hash;
                    newFac.save().then((user) => {
                        res.send(user);
                    }).catch((e) => {
                        res.send(e);
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

faculty.get('/test', (req, res) => {
    res.send('Faculty Route Working!');
});


module.exports = faculty;