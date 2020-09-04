const { body } = require('express-validator');

const validateRegisterInput = [
  body('name', 'Cannot be empty').not().isEmpty(),
  body('email', 'Enter a valid Email address').isEmail(),
  body('password', 'Password must have minimum 6 characters').isLength({
    min: 6,
  }),
];

module.exports = validateRegisterInput;
