const express = require('express');
const router = express.Router();
const { AuthController } = require('../controller/authController');
const auth = new AuthController;

// Create Admin User
router.get('/createAdminUser', auth.createAdminUser)

// Login User
router.post('/login', auth.login)

// Decode Token
router.post('/resolveToken', auth.decodeToken)

module.exports = router;
