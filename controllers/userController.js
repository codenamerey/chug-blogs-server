const passport = require('passport');

const User = require('../models/User');
const bcrypt = require('bcrypt');

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