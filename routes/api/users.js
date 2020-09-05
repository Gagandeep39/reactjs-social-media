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
 *          description: Authorization token
 *    Login:
 *      type: "object"
 *      properties:
 *        email:
 *          type: "string"
 *        password:
 *          type: "string"
 *    Register:
 *      type: "object"
 *      properties:
 *        name:
 *          type: "string"
 *        email:
 *          type: "string"
 *        password:
 *          type: "string"
 *    Profile:
 *      type: "object"
 *      properties:
 *        company:
 *          type: "string"
 *        website:
 *          type: "string"
 *        location:
 *          type: "string"
 *        bio:
 *          type: "string"
 *        status:
 *          type: "string"
 *        githubusername:
 *          type: "string"
 *        skills:
 *          type: "string"
 *        youtube:
 *          type: "string"
 *        facebook:
 *          type: "string"
 *        twitter:
 *          type: "string"
 *        instagram:
 *          type: "string"
 *        linkedin:
 *          type: "string"
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
 *     requestBody:
 *       description: Optional description in *Markdown*
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definition/Register'
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *          application/json:
 *            schema:
 *              $ref: "#/definitions/Token"
 *            example:
 *              token: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWYyYWE3OWRkNmI2MmUyMDkwNTAzMDdhIn0sImlhdCI6MTU5OTIyMDY0MCwiZXhwIjoxNTk5NTgwNjQwfQ.-Xbpcl130MALdAATC2AgVptngaXcC_E91OlnVJTiGjU
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
 *     requestBody:
 *       description: Constins email and password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definition/Login'
 *     responses:
 *       "200":
 *         description: "successful operation"
 *         content:
 *          application/json:
 *            schema:
 *              $ref: #/definitions/Token
 *            example:
 *              token: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWYyYWE3OWRkNmI2MmUyMDkwNTAzMDdhIn0sImlhdCI6MTU5OTIyMDY0MCwiZXhwIjoxNTk5NTgwNjQwfQ.-Xbpcl130MALdAATC2AgVptngaXcC_E91OlnVJTiGjU
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
