const { body } = require('express-validator');

const validateExperienceInput = [
  body('title', 'Title Required').not().isEmpty(),
  body('company', 'Company name Required').not().isEmpty(),
  body('from', 'From date Required').not().isDate(),
];

module.exports = validateExperienceInput;
