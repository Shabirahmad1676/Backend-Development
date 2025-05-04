const express = require('express');
const { register, login, logOut } = require('../controller/authController');
const router = express.Router();


router.post('/register', register);
router.post('/login', login);
router.post('/logout',logOut)
module.exports = router;