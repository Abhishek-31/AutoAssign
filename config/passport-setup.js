var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
var jwt = require('jsonwebtoken');

// importing DB Models
const {facultyModel} = require('./../models/facultyModel');
const { studentModel } = require('./../models/studentModel'); 

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
},
    function (username, password, done, req) {
        console.log(username, password);
        facultyModel.findOne({email: username})
            .then((user) => {
                if(!user) {
                    studentModel.findOne({email: username})
                        .then((user) => {
                            if(!user) {
                                console.log('No such account');
                                return done(null, false, {message: 'No such Username!'})
                            } else {
                                const token = jwt.sign(user, 'jwt-secret');
                                return done(null, {token, user});
                            }
                        })
                }

            });
    }
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'jwt-secret'
},
    function (jwtPayload, done) {
        console.log(jwtPayload);
        done(null, jwtPayload);
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

