const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/auth');
const { body, validationResult } = require('express-validator');
const User = require('../../models/Users');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const validateLoginInput = require('../../validation/login');

/**
 * @route GET /api/auth
 * @description Send user data (Protected route)
 * @access Public
 */
// TO use a middleware we add it as a parameter to express sj
router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

/**
 * @route GET /api/auth
 * @description Authenticate Usrer and get token
 * @access Public
 */
router.post(
  '/', validateLoginInput, async (req, res) => {
    const errors = validationResult(req);
    // Sending Error message in case of errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);

    // Fetch namw email and password
    const { email, password } = req.body;

    try {
      // Different Operations to be performed
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      const payload = {
        user: { id: user.id },
      };
      // Returns a token
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 }, // Expiration
        (err, token) => {
          if (err) throw err;
          res.json({
            success: true,
            token: 'Bearer ' + token
          });
        }
      );
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
