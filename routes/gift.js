const express = require("express");
const router = express.Router();
const { all, add, remove, edit, gift } = require("../controllers/gift");
const { auth } = require("../middleware/auth");


router.get('/', all);
router.get('/:id', gift);
router.post('/add',auth, add);
router.post('/remove/:id', auth, remove);
router.put('/edit/:id', auth, edit);

module.exports = router;