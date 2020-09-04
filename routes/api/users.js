const express = require('express');
const router = express.Router();
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const passport = require('passport');
const UserController = require('../../controllers/users');

/**
 * @route GET /api/users
 * @description Register Route
 * @access Public
 */
router.post('/', validateRegisterInput, UserController.registerUser);

/**
 * @route GET /api/auth
 * @description Authenticate Usrer and get token
 * @access Public
 */
router.post('/login', validateLoginInput, UserController.loginUser);

/**
 * @route GET /api/auth
 * @description Send user data (Protected route)
 * @access Public
 */
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  UserController.sendUserData
);

module.exports = router;
// NOTE: If there are multiple 'res' statwement then all of them must have 'return' before them to prevent further execution
