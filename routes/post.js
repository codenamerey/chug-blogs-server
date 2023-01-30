const express = require('express');
const router = express.Router();

const {
   post_create,
   post_get_all 
} = require('../controllers/postController');

router.get('/', post_get_all);
router.post('/', post_create)

module.exports = router;