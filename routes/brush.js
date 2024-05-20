const express = require("express");
const router = express.Router();
const { all, add, remove, edit, editForUser, brush } = require("../controllers/brush");
const { auth } = require("../middleware/auth");


router.get('/', all);
router.get('/:id', brush);
router.post('/add',auth, add);
router.post('/remove/:id', auth, remove);
router.put('/edit/:id', auth, edit);
router.put('/editforuser', auth, editForUser);

module.exports = router;