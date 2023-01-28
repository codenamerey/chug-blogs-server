const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// Local Strategy Auth
router.post('/local/signup', userController.local_sign_up);
router.post('/local/signin', userController.local_sign_in);

module.exports = router;