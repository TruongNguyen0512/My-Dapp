// routes/UserRoute.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const asyncHandler = require('../middleware/asyncMiddleware');

router.post('/', asyncHandler(UserController.createUser));
router.get('/', asyncHandler(UserController.getAllUsers));
router.get('/:id', asyncHandler(UserController.getUserById));
router.put('/:id', asyncHandler(UserController.updateUserById));
router.delete('/:id', asyncHandler(UserController.deleteUserById));

module.exports = router;
