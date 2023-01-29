const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// Local Strategy Auth
router.post('/local/signup', userController.local_sign_up);
router.post('/local/signin', userController.local_sign_in);
router.get('/me', userController.get_me);

// Google Strategy Auth
router.get('/google', userController.get_google);
router.get('/google/callback', userController.google_callback);

module.exports = router;