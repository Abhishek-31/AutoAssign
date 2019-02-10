var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var {facultyModel} = require('./../models/facultyModel');
var {studentModel} = require('./../models/studentModel');

var TeacherLoggedIn = (req, res, next) => {
    console.log('Inside LoggedIn', req.cookies);
    
    facultyModel.find({email: 'utkarshsingh369@gmail.com'})
        .then((user) => {
            req.user = user;
            next();
        });
    // res.redirect('/dashboard');
}

var authenticate = (req, res, next) => {
    console.log('Inside Authenticate');
    var username= req.body.email, password= req.body.password;
    
    login(username, password);

    function login (username, password) {
        console.log('Entered in Local Strategy');
        console.log(username, password);
        // return done(null, {username: "utkarsh", password: "12345"}, {message: 'Works!'});
        facultyModel.findOne({ email: username })
            .then((user) => {
                if (!user) {                                     // No Faculty with username found. Time to check if Student exists 
                    studentModel.findOne({ email: username })
                        .then((user) => {
                            if (!user) {
                                console.log('No such account');
                                return Promise.reject();
                            } else {
                                console.log('Student Found');
                                bcrypt.compare(password, user.password, function (err, res) {
                                    if(res) {
                                        req.token = jwt.sign({...user}, 'secret');
                                        next();  
                                    } else {
                                        return Promise.reject('Password does not match');
                                    }
                                });
                            }
                        })
                } else {
                    console.log('Faculty Found');
                    bcrypt.compare(password, user.password, function (err, res) {
                        if (res) {
                            console.log('Password Matched');
                            //const token = jwt.sign(user.toJSON(), 'jwt-secret');
                            req.token = jwt.sign({ ...user }, 'secret');
                            next();
                        } else {
                            return Promise.reject('Password does not match');
                        }
                    });
                }

            });
    }
}

module.exports = { TeacherLoggedIn, authenticate }