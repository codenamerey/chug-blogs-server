const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// Local Strategy Auth
router.post('/local/signup', userController.local_sign_up);

module.exports = router;