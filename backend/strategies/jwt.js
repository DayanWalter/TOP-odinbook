const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
require('dotenv').config();

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// Store secret in .env
opts.secretOrKey = process.env.ACCESS_TOKEN_SECRET;

module.exports = new JwtStrategy(opts, async (jwt_payload, done) => {
  const user = await User.findOne({ user_name: jwt_payload.user_name });

  if (jwt_payload.user_name === user.user_name) {
    // return done(null, true);
    // Changed true to user, so I can use _id and username.
    return done(null, user);
  }
  return done(null, false);
});
