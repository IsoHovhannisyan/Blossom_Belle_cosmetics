const express = require('express');
const router = express.Router();
const { login, register, current, initiatePasswordReset, verifyCode, resetPassword, updateFavorites, getUserFavorites, findProductByImage } = require("../controllers/users");
const { auth } = require("../middleware/auth");

router.post('/login', login);
router.post('/register', register);
router.get('/current', auth, current);
router.post('/forgotPassword', initiatePasswordReset);
router.post('/verifyCode', verifyCode ); // Add this line to include the verificationCode function
router.post('/resetPassword', resetPassword); 
router.put('/:userId/favorites', updateFavorites);
router.get('/:userId/favorites', getUserFavorites);
router.get('/findProductByImage', findProductByImage);

module.exports = router;

