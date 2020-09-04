const { body } = require('express-validator');

const validateEducationInput = [
  body('school', 'Institute Required').not().isEmpty(),
  body('degree', 'Degree name Required').not().isEmpty(),
  body('fieldofstudy', 'Field of study Required').not().isEmpty(),
  body('from', 'From date Required').not().isEmpty(),
];

module.exports = validateEducationInput;
