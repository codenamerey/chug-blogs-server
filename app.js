const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');

const dotenv = require('dotenv').config();
const PORT = process.env.PORT;
const MONGODB = process.env.MONGODB;
const DOMAIN = process.env.DOMAIN;


app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(passport.initialize());
require('./services/localStrategy');
require('./services/jwtStrategy');

// Connect to DB
mongoose.connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const DB = mongoose.connection;
DB.on('error', console.error.bind(console, 'MongoDB Connection Error: '));

// ROUTES
const user = require('./routes/user');
const comment = require('./routes/comment');
const post = require('./routes/post');

app.use('/api/user', user);
// app.use('/api/comment', comment);
// app.use('/api/post', post);

app.listen(PORT || 3000, function() {
    console.log(`Listening on ${DOMAIN}:${PORT}`);
});