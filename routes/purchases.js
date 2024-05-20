const express = require("express");
const router = express.Router();
const { all, add } = require("../controllers/purchases");
const { auth } = require("../middleware/auth");


router.get('/', all);
router.post('/add',add);
// router.post('/remove/:id', auth, remove);
// router.put('/edit/:id', auth, edit);
// router.put('/editforuser', auth, editForUser);

module.exports = router;