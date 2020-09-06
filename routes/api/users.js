const express = require('express');
const router = express.Router();
const passport = require('passport');
const UserController = require('../../controllers/users');

/**
 * @route POST /api/users/register
 * @description Create a new User
 */
router.post('/register', UserController.registerUser);

/**
 * @route POST /api/users/login
 * @description Perform Login
 */
router.post('/login', UserController.loginUser);

/**
 * @route GET /api/users/
 * @description Send user data (Protected route)
 */
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  UserController.sendUserData
);

module.exports = router;
// NOTE: If there are multiple 'res' statwement then all of them must have 'return' before them to prevent further execution
