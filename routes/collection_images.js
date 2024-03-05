const express = require('express');
const router = express.Router();
const { all, add, remove, edit, collection_image } = require("../controllers/collection_images");
const { auth } = require('../middleware/auth');

router.get('/', all);
router.get('/:id', collection_image);
router.post('/add',auth, add);
router.post('/remove/:id', auth, remove);
router.put('/edit/:id', auth, edit);

router.get('/images/:fileName', (req, res) => {
    try {
        // Extract the image filename from the request URL
        const fileName = req.params.fileName;

        // Construct the file path
        const filePath = path.join(__dirname, 'public', 'images', fileName);

        // Check if the file exists
        if (fs.existsSync(filePath)) {
            // Read the file and send it as the response
            res.sendFile(filePath);
        } else {
            // If the file doesn't exist, return a 404 error
            res.status(404).send("File not found");
        }
    } catch (err) {
        console.error("Error serving image:", err);
        res.status(500).send("Error serving image");
    }
});

module.exports = router;