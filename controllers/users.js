// Import granvatar
const gravatar = require('gravatar');
// Import bycrptm ffor encryption
const bcrypt = require('bcryptjs');
// Import User model
const User = require('../models/Users');
// Import json web toke
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

exports.registerUser = async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  // Sending Error message in case of errors
  if (!isValid) return res.status(400).json(errors);

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    }

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
};

exports.loginUser = async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) return res.status(400).json(errors);

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        errors.email = 'User not found';
        return res.status(404).json(errors);
      }

      bcrypt.compare(req.body.password, user.password).then((isMatch) => {
        if (!isMatch) {
          errors.password = 'Password incorrect';
          return res.status(400).json(errors);
        }

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
            res.json({
              success: true,
              token: 'Bearer ' + token,
            });
          }
        );
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Server Error');
    });
};

exports.sendUserData = (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then((user) => res.json(user))
    .catch((error) => {
      console.error(error.message);
      res.status(500).send('Server error');
    });
};
