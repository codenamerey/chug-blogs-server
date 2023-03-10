const passport = require('passport');
const jwt = require('jsonwebtoken');

const requireJwtAuth = passport.authenticate('jwt', {session: false});

module.exports = requireJwtAuth;