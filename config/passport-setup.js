var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// importing DB Models
const { facultyModel } = require('./../models/facultyModel');
const { studentModel } = require('./../models/studentModel');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    function (username, password, done) {
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
                                return done(null, false, { message: 'No such Username!' })
                            } else {
                                console.log('Student Found');
                                bcrypt.compare(password, user.password, function (err, res) {
                                    done(null, user)                                    // if(res) {     
                                });
                            }
                        })
                } else {
                    console.log('Faculty Found');
                    bcrypt.compare(password, user.password, function (err, res) {
                        if (res) {
                            console.log('Password Matched');
                            //const token = jwt.sign(user.toJSON(), 'jwt-secret');
                            return done(null, user);
                        } else {
                            return done(null, false, { message: 'Password does not match!' });
                        }
                    });
                }

            });
    }
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'jwt-secret'
},
    function (jwtPayload, cb) {
        console.log('Inside JWT Strategy');
        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        return facultyModel.findOneById(jwtPayload.id)
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

