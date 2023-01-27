const express = require('express');
const app = express();

const dotenv = require('dotenv').config();
const PORT = process.env.PORT;
const MONGODB = process.env.MONGODB;
const DOMAIN = process.env.DOMAIN;

// ROUTES
const user = require('./routes/user');
const comment = require('./routes/comment');
const post = require('./routes/post');

app.use('/api/user', user);
app.use('/api/comment', comment);
app.use('/api/post', post);

app.listen(PORT || 3000, function() {
    console.log(`Listening on ${DOMAIN}:${PORT}`);
});