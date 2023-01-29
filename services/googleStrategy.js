const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;


const User = require('../models/User');
require('dotenv').config();

const googleLogin = new GoogleStrategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: '/api/user/google/callback'
}, async(accessToken, refreshToken, profile, done) => {
    try {
        const user = await User.findOne({email_address: profile.email});
        if(user) {
            
            done(null, user);
        } else {
            try {
                const new_user = new User({
                    first_name: profile.given_name,
                    last_name: profile.family_name,
                    display_picture: profile.picture,
                    email_address: profile.email
                });

                new_user.save((err, user) => {
                    done(null, user);
                })
            } catch(err) {
                done(err, false);
            }
        }
    } catch(err) {
        done(err, false);
    }
});

passport.use(googleLogin);