const { body } = require('express-validator');

const validateProfileInput = [
  body('status', 'Status is required').not().isEmpty(),
  body('skills', 'Skills are required').not().isEmpty(),
];

module.exports = validateProfileInput;
