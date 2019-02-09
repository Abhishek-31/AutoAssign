const student = require('express').Router();
var bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

// Importing Student Model
const { studentModel } = require('../models/studentModel');

var jsonParser = bodyParser.json({ type: 'application/json' });


student.get('/one', (req, res) => {
    res.send('Routing working');
})

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
                    console.log('Coming out of Hash Function: ', newStud);
                });
            });
        } else {
            console.log(user);
            res.send('Student already exists!');
        }
    })
});

student.post('/login', (req, res) => {

});

module.exports = student;