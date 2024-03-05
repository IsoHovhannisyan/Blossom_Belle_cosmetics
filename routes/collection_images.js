const express = require('express');
const router = express.Router();
const { all, add, remove, edit, collection_image, serveImage } = require("../controllers/collection_images");
const { auth } = require('../middleware/auth');

router.get('/', all);
router.get('/:fileName', serveImage);
router.get('/:id', collection_image);
router.post('/add',auth, add);
router.post('/remove/:id', auth, remove);
router.put('/edit/:id', auth, edit);

module.exports = router;