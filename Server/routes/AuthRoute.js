// routes/AuthRoute.js
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const asyncHandler = require('../middleware/asyncMiddleware');

router.post('/authenticate', asyncHandler(AuthController.authenticateWallet));
router.post('/register', asyncHandler(AuthController.registerUser));
router.post('/login', asyncHandler(AuthController.loginUser));

module.exports = router;
