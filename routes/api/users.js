const express = require('express');
const router = express.Router();

/**
 * @route GET /api/users
 * @description Test Route, All the routes will be accessed from '/api/users/*'
 * @access Public
 */
router.get('/', (req, res) => res.send('Users Route'));
module.exports = router;
