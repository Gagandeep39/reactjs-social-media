const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator')

/**
 * @route GET /api/users
 * @description Test Route, All the routes will be accessed from '/api/users/*'
 * @access Public
 */
router.post('/', 
    // Performing Validation using express-validator library
    [
        // username must be an email
        body('name', 'Cannot be empty')
            .not().
            isEmpty(),
        body('email', 'Enter a valid Email address')
            .isEmail(),
        body('password', 'Password must have minimum 6 characters')
            .isLength({min: 6})
    ],
    // Responsding to request
    (req, res) => {
        const errors = validationResult(req);
        // Sending Error message in case of errors
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        console.log(req.body);
        res.send('Users Route');
    }
);
module.exports = router;
