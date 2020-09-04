// Import Express library
const express = require('express');
// Import Routes
const router = express.Router();
// Import Vaidators
const { validationResult } = require('express-validator');
// Import granvatar
const gravatar = require('gravatar');
// Import bycrptm ffor encryption
const bcrypt = require('bcryptjs');
// Import User model
const User = require('../../models/Users');
// Import json web toke
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const validateRegisterInput = require('../../validation/register');

/**
 * @route GET /api/users
 * @description Test Route, All the routes will be accessed from '/api/users/*'
 * @access Public
 */
router.post('/', validateRegisterInput, async (req, res) => {
  const errors = validationResult(req);
  // Sending Error message in case of errors
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  User.findOne({ email: req.body.email }).then((user) => {
    if (user)
      return res.status(400).json({ errors: [{ msg: 'User Already Exists' }] });

    const avatar = gravatar.url(req.body.email, {
      r: 'pg', // Rating 'PG' prevent nudity
      s: '200', // Size 200
      d: 'mm', // Default image
    });

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      avatar,
      password: req.body.password,
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then((user) => {
            const payload = {
              user: { id: user.id },
            };
            // Returns a token
            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 360000 }, // Expiration
              (err, token) => {
                if (err) throw err;
                res.json({ token: 'Bearer ' + token }); // Sucessfullyr eturn tokenif no error
              }
            );
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send('Server Error');
          });
      });
    });
  });
});

module.exports = router;
// NOTE: If there are multiple 'res' statwement then all of them must have 'return' before them to prevent further execution
