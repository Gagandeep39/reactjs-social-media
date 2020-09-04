const express = require('express');
const axios = require('axios');
const router = express.Router();
const User = require('../../models/Users');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');
const passport = require('passport');
const { validationResult } = require('express-validator');
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');
const authenticate = () => passport.authenticate('jwt', { session: false });

/**
 * @route GET /api/profile/me
 * @description Get Current user profile
 * @access Private
 */
router.get('/me', authenticate(), async (req, res) => {
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
    authenticate(),
    validateProfileInput,
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
      user: req.params.userId,
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
router.delete('/', authenticate(), async (req, res) => {
  try {
    await Post.deleteMany({ user: req.user.id })
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
    authenticate(),
    validateExperienceInput,
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
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
router.delete('/experience/:expId', authenticate(), async (req, res) => {
  const profile = await Profile.findOne({ user: req.user.id });
  const removeIndex = profile.experience
    .map((item) => item.id)
    .indexOf(req.params.expId);
  if (removeIndex === -1) return res.status(400).send('Invalid Experience ID');
  profile.experience.splice(removeIndex, 1);
  await profile.save();
  res.json(profile);
});

/**
 * @route PUT /api/profile/eduction
 * @description Add eduction
 * @access Private
 */
router.put(
  '/education',
  [
    authenticate(),
    validateEducationInput,
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).send({ errors: errors.array() });

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      location,
      current,
      description,
    } = req.body;

    const newEducation = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      location,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      // Adds data at the beginning of array
      profile.education.unshift(newEducation);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.log(error);
      res.status(500).send('Server Error');
    }
  }
);

/**
 * @route DELETE /api/profile/education/eduId
 * @description Delete education
 * @access Private
 */
router.delete('/education/:eduId', authenticate(), async (req, res) => {
  const profile = await Profile.findOne({ user: req.user.id });
  const removeIndex = profile.education
    .map((item) => item.id)
    .indexOf(req.params.eduId);
  if (removeIndex === -1) return res.status(400).send('Invalid Education ID');

  profile.education.splice(removeIndex, 1);
  await profile.save();
  res.json(profile);
});

/**
 * @route PUT /api/profile/github/:username
 * @description Get user repos from github
 * @access Public
 */
router.get('/github/:username', (req, res) => {
  try {
    const uri = `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`;
    const header = { 'user-agent': 'node.js' };
    axios
      .get(uri, { headers: header })
      .then((response) => {
        if (response.status !== 200)
          return res.status(404).json({ msg: 'Github account not found' });
        res.json(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
