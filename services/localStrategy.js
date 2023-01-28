const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');
const bcrypt = require('bcrypt');

const localLogin = new LocalStrategy({
        usernameField: 'email_address',
        passwordField: 'password',
        session: false
    },
        async(email, password, done) => {
            try{
                console.log(password);
                const user = await User.findOne({email_address: email});
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if(err) done(err);

                    if(!isMatch) {
                        done(null, false, {message: 'User not found'});
                    } else {
                        done(null, user);
                    }
                });

            } catch(err) {
                done(err);
            }
        }
);

passport.use('local', localLogin);