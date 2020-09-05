const express = require('express');
const router = express.Router();
const validatePostInput = require('../../validation/post');
const postsController = require('../../controllers/posts');
const passport = require('passport');
const authenticate = () => passport.authenticate('jwt', { session: false });

/**
 *  @swagger
 *
 *  definitions:
 *    Post:
 *      type: "object"
 *      properties:
 *        text:
 *          type: "string"
 *    Comment:
 *      type: "object"
 *      properties:
 *        text:
 *          type: "string"
 */
/**
 * @swagger
 *
 * /api/posts:
 *   post:
 *     tags:
 *       - Posts
 *     summary: Create a new Post
 *     description: Creates a post
 *     security:
 *      - bearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Post object
 *         schema:
 *           $ref: "#/definitions/Post"
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
router.post(
  '/',
  [authenticate(), validatePostInput],
  postsController.createPost
);

/**
 * @swagger
 *
 * /api/posts:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Fetch All posts
 *     description: Fetch all post
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
router.get('/', authenticate(), postsController.fetchAllPosts);

/**
 * @swagger
 *
 * /api/posts/{postId}:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Fetch post by ID
 *     description: Fetch by ID
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
router.get('/:postId', authenticate(), postsController.fetchPostById);

/**
 * @swagger
 *
 * /api/posts/{postId}:
 *   delete:
 *     tags:
 *       - Posts
 *     summary: Delete post by ID
 *     description: Delete by ID
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
router.delete('/:postId', authenticate(), postsController.deletePostById);

/**
 * @swagger
 *
 * /api/posts/like/{postId}:
 *   put:
 *     tags:
 *       - Posts
 *     summary: Likes a post
 *     description: Like a post by its Id
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
router.put('/like/:id', authenticate(), postsController.likePost);

/**
 * @swagger
 *
 * /api/posts/like/{postId}:
 *   put:
 *     tags:
 *       - Posts
 *     summary: UnLikes a post
 *     description: UnLike a post by its Id
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
router.put('/unlike/:id', authenticate(), postsController.unlikePost);

/**
 * @swagger
 *
 * /api/posts/comment/{id}:
 *   post:
 *     tags:
 *       - Posts
 *     summary: Add comment
 *     description: Add comment to the post
 *     security:
 *      - bearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Comment object
 *         schema:
 *           $ref: "#/definitions/Comment"
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
router.post(
  '/comment/:id',
  [authenticate(), validatePostInput],
  postsController.commentOnPost
);

/**
 * @swagger
 *
 * /api/posts/comment/{id}/{commentId}:
 *   delete:
 *     tags:
 *       - Posts
 *     summary: Delet a comment
 *     description: Delete coment using commentId and post Id
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
router.delete(
  '/comment/:id/:commentId',
  authenticate(),
  postsController.deleteComment
);

module.exports = router;
