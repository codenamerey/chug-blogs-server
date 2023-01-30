const express = require('express');
const router = express.Router();

const {
   post_create,
   post_get_all,
   post_get_one 
} = require('../controllers/postController');

router.get('/', post_get_all);
router.post('/', post_create);

router.get('/:id', post_get_one);

module.exports = router;