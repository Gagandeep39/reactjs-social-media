const { body } = require('express-validator');

const validateLoginInput = [
  body('email', 'Enter a valid Email address').isEmail(),
  body('password', 'Password is required').exists(),
];

module.exports = validateLoginInput;
