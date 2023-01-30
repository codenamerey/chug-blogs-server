const express = require('express');
const router = express.Router();

const {
   post_create 
} = require('../controllers/postController');

router.post('/', post_create)

module.exports = router;