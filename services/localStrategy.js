const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');
const bcrypt = require('bcrypt');

const localLogin = new LocalStrategy(
        async(email, password, done) => {
            try{
                const user = await User.find({email_address: email})[0];
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

const LocalSignUp = new LocalStrategy({
    passReqToCallback: true
}, async(email, password, done) => {
    try{
        const user = await User.find({email_address: email})[0];
        if(user) {
            done(null, false, {message: 'User already exists'});
        } else {
            const {first_name, last_name, display_picture} = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                first_name,
                last_name,
                display_picture,
                password: hashedPassword,
                email_address: email
            });

            await newUser.save();
            done(null, newUser);
        }
    } catch(err) {
        done(err);
    }
})

passport.use('local-signup', LocalSignUp);