// Import Express library
const express = require('express');
// Import Routes
const router = express.Router();
// Import Vaidators
const { body, validationResult } = require('express-validator')
// Import granvatar
const gravatar = require('gravatar');
// Import bycrptm ffor encryption
const bcrypt = require('bcryptjs')
// Import User model
const User = require('../../models/Users');
// Import json web toke
const jwt = require('jsonwebtoken');
// import jwt secret from config
const config = require('config')

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
    // Async as it rquires databse access hich takes time
    async (req, res) => {
        const errors = validationResult(req);
        // Sending Error message in case of errors
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        console.log(req.body);

        // Fetch namw email and password 
        const { name, email, password } = req.body

        try {

            // Different Operations to be performed
            let user = await User.findOne({ email })

            // 1. Check if Email Esists
            // Return is used to prefent further execution
            if (user) {
                return res.status(400).json({errors: [
                    { msg: 'User Already Exists' }
                ]})
            }

            // 2. Fetch Gravatae
            const avatar = gravatar.url(email, {
                // Rating 'PG' prevent nudity
                r: 'pg',
                // Size 200
                s: '200',
                // Default image
                d: 'mm'
            })
            user = new User({
                name,
                email,
                avatar,
                password
            })

            // 3. Encrypt Password using BCrypt
            // Number of rounds
            // Await because it will return a promise
            // Also further executtion mst not be performed until this is done
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(password, salt);
            // Save user in database
            await user.save();

            // 4. Generate a JWT Token
            const payload = {
                user: {
                    // Mongo uses _id but mongoose provide an abstraction for that
                    id: user.id
                }
            }
            // Returns a token
            jwt.sign(payload, config.get('jwtSecret'), 
            {expiresIn: 360000},    // Expiration
            (err, token) => {
                if(err) throw err;
                res.json({token})   // Sucessfullyr eturn tokenif no error
            })
            // In progress 
            // res.send('Users registered');
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;
// NOTE: If there are multiple 'res' statwement then all of them must have 'return' before them to prevent further execution
