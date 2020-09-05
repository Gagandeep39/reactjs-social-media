const express = require('express');
const router = express.Router();
const passport = require('passport');
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');
const profileController = require('../../controllers/profile');
const authenticate = () => passport.authenticate('jwt', { session: false });

/**
 *  @swagger
 *
 *  definitions:
 *    Education:
 *      type: "object"
 *      properties:
 *        school:
 *          type: "string"
 *          example: Random Engineering Institute
 *        degree:
 *          type: "string"
 *          example: B.E
 *        fieldofstudy:
 *          type: "string"
 *          example: Computer Science
 *        from:
 *          type: "string"
 *          example: 2016
 *        to:
 *          type: "string"
 *          example: 2020
 *        location:
 *          type: "string"
 *          example: Earth
 *        current:
 *          type: "string"
 *          example: false
 *        description:
 *          type: "string"
 *          example: Its just an education entry
 *    Experience:
 *      type: "object"
 *      properties:
 *        title:
 *          type: "string"
 *          example: Senior Developer
 *        company:
 *          type: "string"
 *          example: Random Company
 *        from:
 *          type: "string"
 *          example: 12-12-2019
 *        to:
 *          type: "string"
 *        location:
 *          type: "string"
 *          example: Somewhere on Earth
 *        current:
 *          type: "string"
 *          example: true
 *        description:
 *          type: "string"
 *          example: Just another boring Job, nothing special
 *    
 */

/**
 * @swagger
 *
 * /api/profile/me:
 *   get:
 *     tags:
 *       - Profile
 *     summary: Fetch User profile
 *     description: Fetches user's profile, education, experience
 *     security:
 *      - bearerAuth: []
 *     produces:
 *       - application/json
 *     parameters: []
 *     responses:
 *       200:
 *         description: successful operation
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 *       401:
 *         $ref: '#/responses/UnauthorizedError'
 */
router.get('/me', authenticate(), profileController.fetchCurrentUser);

/**
 * @swagger
 *
 * /api/profile:
 *   post:
 *     tags:
 *       - Profile
 *     summary: Create Profile
 *     description: Create a user profile
 *     security:
 *      - bearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Profile object
 *         schema:
 *           $ref: "#/definitions/ProfileReq"
 *     responses:
 *       200:
 *         description: successful operation
 *       400:
 *         description: Bad Request
 *       401:
 *         $ref: '#/responses/UnauthorizedError'
 *       500:
 *         description: Internal Server Error
 */
router.post(
  '/',
  [authenticate(), validateProfileInput],
  profileController.createOrUpdateProfile
);

/**
 * @swagger
 *
 * /api/profile:
 *   get:
 *     tags:
 *       - Profile
 *     summary: Fetch all profiles
 *     description: Fetches all profiless
 *     produces:
 *       - application/json
 *     parameters: []
 *     responses:
 *       200:
 *         description: successful operation
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 *       401:
 *         $ref: '#/responses/UnauthorizedError'
 */
router.get('/', profileController.fetchAllProfiles);

/**
 * @swagger
 *
 * /api/profile/user/{userId}:
 *   get:
 *     tags:
 *       - Profile
 *     summary: Fetch profile by ID
 *     description: Fetches profile of a user whose id is passed as parameter
 *     security:
 *      - bearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: "userId"
 *       in: "path"
 *       description: "ID of User whose profile to return"
 *       required: true
 *       type: "string"
 *     responses:
 *       200:
 *         description: successful operation
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.get('/user/:userId', profileController.fetchProfileById);

/**
 * @swagger
 *
 * /api/profile:
 *   delete:
 *     tags:
 *       - Profile
 *     summary: Delete profile
 *     description: Delete profile of the user with the help of token
 *     security:
 *      - bearerAuth: []
 *     produces:
 *       - application/json
 *     parameters: []
 *     responses:
 *       200:
 *         description: successful operation
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.delete('/', authenticate(), profileController.deleteProfile);

/**
 * @swagger
 *
 * /api/profile/experience:
 *   put:
 *     tags:
 *       - Profile
 *     summary: Add new experience of the user
 *     description: Creates a new entry of work experience
 *     security:
 *      - bearerAuth: []
 *     produces:
 *       - application/json
 *     parameters: 
 *       - in: body
 *         name: body
 *         description: Work experience object
 *         required: true
 *         schema:
 *           $ref: "#/definitions/Experience"
 *     responses:
 *       200:
 *         description: successful operation
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 *       401:
 *         $ref: '#/responses/UnauthorizedError'
 */
router.put(
  '/experience',
  [authenticate(), validateExperienceInput],
  profileController.addExperience
);

/**
 * @swagger
 *
 * /api/profile/experience/{expId}:
 *   delete:
 *     tags:
 *       - Profile
 *     summary: Delete Experience
 *     description: Delete expreience of user with the help of ID passed as param
 *     security:
 *      - bearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: "expId"
 *       in: "path"
 *       description: "ID of experience to delete"
 *       required: true
 *       type: "string"
 *     responses:
 *       200:
 *         description: successful operation
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 *       401:
 *         $ref: '#/responses/UnauthorizedError'
 */
router.delete(
  '/experience/:expId',
  authenticate(),
  profileController.deleteExperience
);

/**
 * @swagger
 *
 * /api/profile/education:
 *   put:
 *     tags:
 *       - Profile
 *     summary: Add new education details
 *     description: Delete profile of the user with the help of token
 *     security:
 *      - bearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Profile object
 *         schema:
 *           $ref: "#/definitions/Education"
 *     responses:
 *       200:
 *         description: successful operation
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 *       401:
 *         $ref: '#/responses/UnauthorizedError'
 */
router.put(
  '/education',
  [authenticate(), validateEducationInput],
  profileController.addEducation
);

/**
 * @swagger
 *
 * /api/profile/education/{eduId}:
 *   delete:
 *     tags:
 *       - Profile
 *     summary: Delete Education
 *     description: Delete education details of user with the help of ID passed as param
 *     security:
 *      - bearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: "eduId"
 *       in: "path"
 *       description: "ID of education entry to delete"
 *       required: true
 *       type: "string"
 *     responses:
 *       200:
 *         description: successful operation
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 *       401:
 *         $ref: '#/responses/UnauthorizedError'
 */
router.delete(
  '/education/:eduId',
  authenticate(),
  profileController.deleteEducation
);

/**
 * @swagger
 *
 * /api/profile/github/{username}:
 *   get:
 *     tags:
 *       - Profile
 *     summary: Fetch Github repositories
 *     description: Fetch github repositories using github username
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: "username"
 *       in: "path"
 *       description: "username of user whose repositories are to be fetched"
 *       required: true
 *       type: "string"
 *     responses:
 *       200:
 *         description: successful operation
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.get('/github/:username', profileController.getUserRepositories);

module.exports = router;
