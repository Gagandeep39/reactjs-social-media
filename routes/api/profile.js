const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const User = require('../../models/Users')
const Profile = require('../../models/Profile')

/**
 * @route GET /api/profile/me
 * @description Get Current user profile
 * @access Private
 */
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name', 'avatar'])
    if(!profile){
      return res.status(400).send({msg: 'Profile not found'})
    }
    res.send(profile)
  } catch (error) {
    res.status(500).send('Server Error')
  }
});
module.exports = router;
