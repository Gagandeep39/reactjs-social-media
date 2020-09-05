const express = require('express');
const router = express.Router();
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const passport = require('passport');
const UserController = require('../../controllers/users');
/**
 *  @swagger
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 */
/**
 *  @swagger
 *
 *  definitions:
 *    Token:
 *      type: object
 *      properties:
 *        token:
 *          type: string
 *          example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWYyYWE3OWRkNmI2MmUyMDkwNTAzMDdhIn0sImlhdCI6MTU5OTIyMDY0MCwiZXhwIjoxNTk5NTgwNjQwfQ.-Xbpcl130MALdAATC2AgVptngaXcC_E91OlnVJTiGjU
 *          description: Authorization token
 *    Login:
 *      type: "object"
 *      properties:
 *        email:
 *          type: "string"
 *          example: test@mail.com
 *        password:
 *          type: "string"
 *          example: 1234567
 *    Register:
 *      type: "object"
 *      properties:
 *        name:
 *          type: "string"
 *          example: Gagandeep Singh
 *        email:
 *          type: "string"
 *          example: test@mail.com
 *        password:
 *          type: "string"
 *          example: 123456
 *    ProfileReq:
 *      type: "object"
 *      properties:
 *        company:
 *          type: "string"
 *          example: Lol
 *        website:
 *          type: "string"
 *          example: www.xyz.com
 *        location:
 *          type: "string"
 *          example: Earth
 *        bio:
 *          type: "string"
 *          example: Hi, I am a guy
 *        status:
 *          type: "string"
 *        githubusername:
 *          type: "string"
 *          example: gagandeep39
 *        skills:
 *          type: "string"
 *          example: JS, Springboot, Angular, ReactJS
 *        youtube:
 *          type: "string"
 *          example: www.youtube.com/gagandeep39
 *        facebook:
 *          type: "string"
 *          example: www.facebook.com/facebook
 *        twitter:
 *          type: "string"
 *          example: www.twitter.com/twitter
 *        instagram:
 *          type: "string"
 *          example: www.facebook.com/facebook
 *        linkedin:
 *          type: "string"
 *          example: www.linkedin.com/linkedin
 */
/**
 *  @swagger
 *
 *  responses:
 *    UnauthorizedError:
 *      description: Access token is missing or invalid
 */

/**
 * @swagger
 *
 * /api/users/register:
 *   post:
 *     tags:
 *       - User
 *     summary: Perform Registration
 *     description: Allows user to Create an account
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Register object
 *         schema:
 *           $ref: "#/definitions/Register"
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *          application/json:
 *            schema:
 *              $ref: "#/definitions/Token"
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post('/', validateRegisterInput, UserController.registerUser);

/**
 * @swagger
 *
 * /api/users/login:
 *   post:
 *     tags:
 *     - "User"
 *     summary: "Perform Login"
 *     description: "Allows user to login and get a token in return"
 *     produces:
 *     - "application/json"
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Register object
 *         schema:
 *           $ref: "#/definitions/Login"
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *          application/json:
 *            schema:
 *              $ref: "#/definitions/Token"
 *       "400":
 *         description: "Bad Request"
 *       "500":
 *         description: "Internal Server Error"
 *     x-swagger-router-controller: "User"
 */
router.post('/login', validateLoginInput, UserController.loginUser);

/**
 * @swagger
 *
 * /api/users:
 *   get:
 *     tags:
 *       - "User"
 *     summary: "Get user Info"
 *     description: "Used to fetch data using token value"
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       "200":
 *         description: "OK"
 *       "401":
 *         $ref: '#/responses/UnauthorizedError'
 */
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  UserController.sendUserData
);

module.exports = router;
// NOTE: If there are multiple 'res' statwement then all of them must have 'return' before them to prevent further execution
