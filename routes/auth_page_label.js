const express = require('express');
const router = express.Router();
const { add, edit, remove, all, auth_page_label } = require("../controllers/auth_page_label");
const { auth } = require('../middleware/auth');

router.get("/", all);
router.get("/:id", auth_page_label );
router.post("/add", auth, add);
router.post("/remove/:id", auth, remove);
router.put("/edit/:id", auth, edit);

module.exports = router;