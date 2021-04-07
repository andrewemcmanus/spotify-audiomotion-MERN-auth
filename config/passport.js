require('dotenv').config();

// passport strategy for authentication with a JSON web token
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');

const User = require('../models/User');

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.JWT_SECRET;

module.exports = (passport) => {
  passport.use(new JwtStrategy(options, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
    .then(user => {
      // jwt_payloud is an object literal that contains the decoded JWT payload
      // 'done' is a callback that has an error first an argument done(error, user, info)
      if (user) {
        // if a user is found, return null for an error and the user
        return done(null, user)
      } else {
        // no user was found
        return done(null, false)
      }
    }).catch(error => console.log(error))
  }))
}
