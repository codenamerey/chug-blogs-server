const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const UserSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email_address: {
        type: String
    },
    display_picture: {
        type: String
    },
    password: {
        type: String,
    }
});

UserSchema.methods.generateJWTToken = function(){
    const user = {
        email: this.email_address,
        id: this._id
    }

    return jwt.sign(user, process.env.JWT_SECRET);
}

UserSchema.virtual('name').get(function() {
    return `${this.first_name} ${this.last_name}`;
});

module.exports = mongoose.model('User', UserSchema);