const express = require('express');
const { register, login, logOut, sendVerifyOtp, verifyEmail, isAuthenticated, sendResetOtp, resetPassword } = require('../controller/authController');
const userAuth = require('../middleware/authMiddleware');
const router = express.Router();


router.post('/register', register);
router.post('/login', login);
router.post('/logout',logOut)
router.post('/sendOtp',userAuth, sendVerifyOtp)
router.post('/verifyEmail',userAuth, verifyEmail)
router.post('/isAuth',userAuth, isAuthenticated)
router.post('/resetOtp', sendResetOtp)
router.post('/resetPass', resetPassword )

module.exports = router;