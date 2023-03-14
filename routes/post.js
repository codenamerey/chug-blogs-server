const express = require('express');
const router = express.Router();

const {
   post_create,
   post_get_all,
   post_get_one,
   post_edit,
   post_delete,
   post_image_handler
} = require('../controllers/postController');

router.get('/', post_get_all);
router.post('/', post_create);

router.post('/image', post_image_handler);

router.get('/:id', post_get_one);
router.put('/:id', post_edit);
router.delete('/:id', post_delete);



module.exports = router;