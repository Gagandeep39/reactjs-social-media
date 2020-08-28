const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/Users');
const Profile = require('../../models/Profile');
const { body, validationResult } = require('express-validator');

/**
 * @route GET /api/profile/me
 * @description Get Current user profile
 * @access Private
 */
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);
    if (!profile) {
      return res.status(400).send({ msg: 'Profile not found' });
    }
    res.send(profile);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

/**
 * @route POST /api/profile/
 * @description Create or Update Profile
 * @access Private
 */
router.post(
  '/',
  [
    auth,
    [
      body('status', 'Status is required').not().isEmpty(),
      body('skills', 'Skills are required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills)
      profileFields.skills = skills.split(',').map((skill) => skill.trim());

    profileFields.social = {};
    if (youtube) profileFields.social.youtube = req.body.youtube;
    if (twitter) profileFields.social.twitter = req.body.twitter;
    if (facebook) profileFields.social.facebook = req.body.facebook;
    if (linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (instagram) profileFields.social.instagram = req.body.instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profileFields);
      }

      // Create
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (error) {
      res.status(500).send('Server Error');
    }
  }
);

/**
 * @route POST /api/profile/
 * @description Fetch all profile
 * @access Public
 */
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

/**
 * @route POST /api/profile/user/:userId
 * @description Fetch profile By ID
 * @access Public
 */
router.get('/user/:userId', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);
    if (!profile)
      return res.status(400).send({ msg: 'No Profile for this User' });
    res.json(profile);
  } catch (error) {
    if (error.kind === 'ObjectId')
      return res.status(400).send({ msg: 'No Profile for this User' });
    res.status(500).send('Internal Server Error');
  }
});

/**
 * @route DELETE /api/profile/
 * @description Delete profile, users, post
 * @access Private
 */
router.delete('/', auth, async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: 'User removed' });
  } catch (error) {
    if (error.kind === 'ObjectId')
      return res.status(400).send({ msg: 'No Profile for this User' });
    res.status(500).send('Internal Server Error');
  }
});

/**
 * @route PUT /api/profile/experience
 * @description Add experience
 * @access Private
 */
router.put(
  '/experience',
  [
    auth,
    [
      body('title', 'Title Required').not().isEmpty(),
      body('company', 'Company name Required').not().isEmpty(),
      body('from', 'From date Required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty)
      return res.status(400).send({ errors: errors.array() });

    const {
      title,
      company,
      from,
      to,
      location,
      current,
      description,
    } = req.body;

    const newExperience = {
      title,
      company,
      from,
      to,
      location,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      // Adds data at the beginning of array
      profile.experience.unshift(newExperience);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.log(error);
      res.status(500).send('Server Error');
    }
  }
);

/**
 * @route DELETE /api/profile/experience
 * @description Delete experience
 * @access Private
 */
router.delete('/experience/:expId', auth, async (req, res) => {
  const profile = await Profile.findOne({ user: req.user.id });
  const removeIndex = profile.experience
    .map((item) => item.id)
    .indexOf(req.params.expId);
  if (removeIndex === -1) res.status(400).send('Invalid Experience ID');
  profile.experience.splice(removeIndex, 1);
  await profile.save();
  res.json(profile);
});

module.exports = router;
