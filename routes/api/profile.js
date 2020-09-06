const express = require('express');
const router = express.Router();
const passport = require('passport');
const profileController = require('../../controllers/profile');
const authenticate = () => passport.authenticate('jwt', { session: false });

/**
 * @route GET /api/profile/me
 * @description Fetch User Profile
 */
router.get('/me', authenticate(), profileController.fetchCurrentUser);

/**
 * @route POST /api/profile
 * @description Create/ Update Profile
 */
router.post('/', authenticate(), profileController.createOrUpdateProfile);

/**
 * @route GET /api/profile
 * @description Fetch All profiles
 */
router.get('/', profileController.fetchAllProfiles);

/**
 * @route GET /api/profile/user/:userId
 * @description Fetch Profile By ID
 */
router.get('/user/:userId', profileController.fetchProfileById);

/**
 * @route DELETE /api/profile
 * @description Delete Profile
 */
router.delete('/', authenticate(), profileController.deleteProfile);

/**
 * @route PUT /api/profile/experience
 * @description Add new experience entry
 */
router.put('/experience', authenticate(), profileController.addExperience);

/**
 * @route DELETE /api/profile/experience/:expId
 * @description Delete experieence by ID
 */
router.delete(
  '/experience/:expId',
  authenticate(),
  profileController.deleteExperience
);

/**
 * @route PUT /api/profile/education
 * @description Add new education entry
 */
router.put('/education', authenticate(), profileController.addEducation);

/**
 * @route DELETE /api/profile/education/:eduId
 * @description Delete education by ID
 */
router.delete(
  '/education/:eduId',
  authenticate(),
  profileController.deleteEducation
);

/**
 * @route GET /api/profile/github/:username
 * @description Fetch github info by username
 */
router.get('/github/:username', profileController.getUserRepositories);

module.exports = router;
