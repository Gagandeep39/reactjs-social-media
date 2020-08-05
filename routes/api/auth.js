const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/auth');
const Users = require('../../models/Users');

/**
 * @route GET /api/users
 * @description Test Route
 * @access Public
 */
// TO use a middleware we add it as a parameter to express sj
router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await Users.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});
module.exports = router;
