const passport = require('passport');
const passportJWT = require('passport-jwt');
const jwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

const User = require('../models/User');
const dotenv = require('dotenv').config();

const jwtLogin = new jwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}, async(payload, done) => {
    try {
        const user = await User.find({email_address: payload.email});
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    } catch(err) {
        done(err);
    }
});

passport.use(jwtLogin);