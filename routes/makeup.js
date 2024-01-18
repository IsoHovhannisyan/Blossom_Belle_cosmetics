const express = require("express");
const router = express.Router();
const { all, add, remove, edit, makeup } = require("../controllers/makeup");
const { auth } = require("../middleware/auth");


router.get('/', all);
router.get('/:id', makeup);
router.post('/add',auth, add);
router.post('/remove/:id', auth, remove);
router.put('/edit/:id', auth, edit);

module.exports = router;