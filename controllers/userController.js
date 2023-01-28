const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config();

// Local Strategy
exports.local_sign_up = async(req, res, next) => {
    try {
        const { email_address, display_picture, password, first_name, last_name } = req.body;
        const user = await User.find({email_address});

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
        res.status(200).json({message: 'New user created.'});
    } catch(err) {
        res.status(500).json({err: err.message});
    }
        
}

exports.local_sign_in = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err) return next(err);
        if(user) {
            const token = user.generateJWTToken();
            res.status(200).json({message: 'Logged in', token});
        } else {
            console.log(user);
            console.log(req.body);
            res.status(422).json({message: 'Invalid credentials'});
        }
        
    })(req, res, next)
}