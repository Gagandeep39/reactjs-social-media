const axios = require('axios');
const User = require('../models/Users');
const Profile = require('../models/Profile');
const { validationResult } = require('express-validator');
const keys = require('../config/keys');

exports.fetchCurrentUser = async (req, res) => {
  Profile.findOne({
    user: req.user.id,
  })
    .populate('user', ['name', 'avatar'])
    .then((profile) => {
      if (!profile) {
        return res.status(400).send({ msg: 'Profile not found' });
      }
      res.send(profile);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('Server Error');
    });
};

exports.createOrUpdateProfile = async (req, res) => {
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }

  const profileFields = {};
  profileFields.user = req.user.id;
  if (req.body.company) profileFields.company = req.body.company;
  if (req.body.website) profileFields.website = req.body.website;
  if (req.body.location) profileFields.location = req.body.location;
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.status) profileFields.status = req.body.status;
  if (req.body.githubusername)
    profileFields.githubusername = req.body.githubusername;
  if (req.body.skills)
    profileFields.skills = req.body.skills
      .split(',')
      .map((skill) => skill.trim());

  profileFields.social = {};
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

  Profile.findOne({ user: req.user.id })
    .then((profile) => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(() => res.json(profileFields));
      } else {
        // Create
        profile = new Profile(profileFields);
        profile.save().then(() => res.json(profile));
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('Server Error');
    });
};

exports.fetchAllProfiles = async (req, res) => {
  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then((profiles) => res.json(profiles))
    .catch((error) => {
      console.log(error);
      res.status(500).send('Internal Server Error');
    });
};

exports.fetchProfileById = async (req, res) => {
  Profile.findOne({
    user: req.params.userId,
  })
    .populate('user', ['name', 'avatar'])
    .then((profile) => {
      if (!profile)
        return res.status(400).send({ msg: 'No Profile for this User' });
      res.json(profile);
    })
    .catch((error) => {
      if (error.kind === 'ObjectId')
        return res.status(400).send({ msg: 'No Profile for this User' });
      res.status(500).send('Internal Server Error');
    });
};

exports.deleteProfile = async (req, res) => {
  Profile.findOneAndRemove({ user: req.user.id })
    .then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ msg: 'User removed' })
      );
    })
    .catch((error) => {
      if (error.kind === 'ObjectId')
        return res.status(400).send({ msg: 'No Profile for this User' });
      res.status(500).send('Internal Server Error');
    });
};

exports.addExperience = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).send({ errors: errors.array() });

  const newExperience = {
    title: req.body.title,
    company: req.body.company,
    from: req.body.from,
    to: req.body.to,
    location: req.body.location,
    current: req.body.current,
    description: req.body.description,
  };

  Profile.findOne({ user: req.user.id })
    .then((profile) => {
      profile.experience.unshift(newExperience);
      profile.save().then(() => res.json(profile));
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('Server Error');
    });
};

exports.deleteExperience = async (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then((profile) => {
      const removeIndex = profile.experience
        .map((item) => item.id)
        .indexOf(req.params.expId);
      if (removeIndex === -1)
        return res.status(400).send('Invalid Experience ID');
      profile.experience.splice(removeIndex, 1);
      profile.save().then(() => res.json(profile));
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('Server Error');
    });
};

exports.addEducation = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).send({ errors: errors.array() });

  const newEducation = {
    school: req.body.school,
    degree: req.body.degree,
    fieldofstudy: req.body.fieldofstudy,
    from: req.body.from,
    to: req.body.to,
    location: req.body.location,
    current: req.body.current,
    description: req.body.description,
  };

  Profile.findOne({ user: req.user.id })
    .then((profile) => {
      profile.education.unshift(newEducation);
      profile.save().then(() => res.json(profile));
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('Server Error');
    });
};

exports.deleteEducation = async (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then((profile) => {
      const removeIndex = profile.education
        .map((item) => item.id)
        .indexOf(req.params.eduId);
      if (removeIndex === -1)
        return res.status(400).send('Invalid Education ID');

      profile.education.splice(removeIndex, 1);
      profile.save().then(() => res.json(profile));
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('Server Error');
    });
};

exports.getUserRepositories = (req, res) => {
  try {
    const uri = `https://api.github.com/users/${
      req.params.username
    }/repos?per_page=5&sort=created:asc&client_id=${keys.githubClientId}&client_secret=${keys.githubSecret}`;
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
    console.log(error);
    res.status(500).send('Server Error');
  }
};
