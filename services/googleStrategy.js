const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const dotenv = require('dotenv').config();
const User = require('../models/User');

const googleLogin = new GoogleStrategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: '/google/callback'
}, async(accessToken, refreshToken, profile, done) => {
    try {
        const user = await User.find({email_address: profile.email});
        if(user) {
            done(null, user);
        } else {
            done(null, false);
        }
    } catch(err) {
        done(err);
    }
});

passport.use(googleLogin);