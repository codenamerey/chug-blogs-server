const express = require('express');
const router = express.Router();

const {
   post_create,
   post_get_all,
   post_get_one,
   post_edit 
} = require('../controllers/postController');

router.get('/', post_get_all);
router.post('/', post_create);

router.get('/:id', post_get_one);
router.put('/:id', post_edit);

module.exports = router;