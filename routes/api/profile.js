const express = require('express');
const router = express.Router();
const passport = require('passport');
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');
const profileController = require('../../controllers/profile');
const authenticate = () => passport.authenticate('jwt', { session: false });

/**
 * @route GET /api/profile/me
 * @description Get Current user profile
 * @access Private
 */
router.get('/me', authenticate(), profileController.fetchCurrentUser);

/**
 * @route POST /api/profile/
 * @description Create or Update Profile
 * @access Private
 */
router.post(
  '/',
  [authenticate(), validateProfileInput],
  profileController.createOrUpdateProfile
);

/**
 * @route POST /api/profile/
 * @description Fetch all profile
 * @access Public
 */
router.get('/', profileController.fetchAllProfiles);

/**
 * @route POST /api/profile/user/:userId
 * @description Fetch profile By ID
 * @access Public
 */
router.get('/user/:userId', profileController.fetchProfileById);

/**
 * @route DELETE /api/profile/
 * @description Delete profile, users, post
 * @access Private
 */
router.delete('/', authenticate(), profileController.deleteProfile);

/**
 * @route PUT /api/profile/experience
 * @description Add experience
 * @access Private
 */
router.put(
  '/experience',
  [authenticate(), validateExperienceInput],
  profileController.addExperience
);

/**
 * @route DELETE /api/profile/experience
 * @description Delete experience
 * @access Private
 */
router.delete(
  '/experience/:expId',
  authenticate(),
  profileController.deleteExperience
);

/**
 * @route PUT /api/profile/eduction
 * @description Add eduction
 * @access Private
 */
router.put(
  '/education',
  [authenticate(), validateEducationInput],
  profileController.addEducation
);

/**
 * @route DELETE /api/profile/education/eduId
 * @description Delete education
 * @access Private
 */
router.delete(
  '/education/:eduId',
  authenticate(),
  profileController.deleteEducation
);

/**
 * @route PUT /api/profile/github/:username
 * @description Get user repos from github
 * @access Public
 */
router.get('/github/:username', profileController.getUserRepositories);

module.exports = router;
