const passport = require('passport');
const jwt = require('jsonwebtoken');
const requireJwtAuth = require('../middleware/requireJwtAuth');

const User = require('../models/User');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config();

// Local Strategy
exports.local_sign_up = async(req, res, next) => {
    try {
        const { email_address, display_picture, password, first_name, last_name } = req.body;
        const user = await User.findOne({email_address});

        if(user) return res.status(422).json({message: 'User already exists'});

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email_address,
            display_picture,
            first_name,
            last_name,
            password: hashedPassword
        });

        await newUser.save();
        res.status(200).json({success: true, message: 'New user created.'});
    } catch(err) {
        res.status(500).json({success: false, err: err.message});
    }
        
}

exports.local_sign_in = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err) return next(err);
        if(user) {
            const token = `BEARER ${user.generateJWTToken()}`;
            res.status(200).json({message: 'Logged in', token});
        } else {
            res.status(422).json({message: 'Invalid credentials'});
        }
        
    })(req, res, next)
}

exports.get_me = [
    requireJwtAuth,
    (req, res, next) => {
        let user = Object.assign({}, req.user)._doc;
        delete user.password;

        res.status(200).json(user)
    }
];

// Google Strategy

exports.get_google = passport.authenticate('google', {
    scope: ['email', 'profile']
});

exports.google_callback = [passport.authenticate('google', {
    failureRedirect: '/login/failure',
    session: false
}), (req, res) => {
    const token = req.user.generateJWTToken();
    res.redirect(`${process.env.clientServer}/google/login?token=${token}`);
}]