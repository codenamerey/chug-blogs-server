const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');
const bcrypt = require('bcrypt');

const localLogin = new LocalStrategy(
        async(email, password, done) => {
            try{
                const user = await User.find({email_address: email});
                const isMatch = await bcrypt.compare(password, user.password);
                if(!isMatch) {
                    done(null, false, {message: 'User not found'});
                } else {
                    done(null, user);
                }
            } catch(err) {
                done(err);
            }
        }
);

passport.use(localLogin);