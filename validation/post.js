const { body } = require('express-validator');

const validatePostInput = [body('text', 'Text is required').not().isEmpty()];

module.exports = validatePostInput;
