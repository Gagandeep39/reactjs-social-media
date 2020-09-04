const express = require('express');
const router = express.Router();
const validatePostInput = require('../../validation/post');
const postsController = require('../../controllers/posts');
const passport = require('passport');
const authenticate = () => passport.authenticate('jwt', { session: false });

/**
 * @route POST /api/posts
 * @description Create a post
 * @access Private
 */
router.post(
  '/',
  [authenticate(), validatePostInput],
  postsController.createPost
);

/**
 * @route GET /api/posts
 * @description Fetch All Posts
 * @access Privte
 */
router.get('/', authenticate(), postsController.fetchAllPosts);

/**
 * @route GET /api/posts/:postId
 * @description Fetch Post by ID
 * @access Privte
 */
router.get('/:postId', authenticate(), postsController.fetchPostById);

/**
 * @route DELETE /api/posts/:postId
 * @description Delete Post by ID
 * @access Privte
 */
router.delete('/:postId', authenticate(), postsController.deletePostById);

/**
 * @route PUT /api/posts/like/:id
 * @description Like a post
 * @access Privte
 */
router.put('/like/:id', authenticate(), postsController.likePost);

/**
 * @route PUT /api/posts/unlike/:id
 * @description Unlike a post
 * @access Privte
 */
router.put('/unlike/:id', authenticate(), postsController.unlikePost);

/**
 * @route PUT /api/posts/comment/:id
 * @description Comment in a post
 * @access Privte
 */
router.post(
  '/comment/:id',
  [authenticate(), validatePostInput],
  postsController.commentOnPost
);

/**
 * @route DELETE /api/posts/comment/:id/:commentId
 * @description Delete a comment
 * @access Privte
 */
router.delete(
  '/comment/:id/:commentId',
  authenticate(),
  postsController.deleteComment
);

module.exports = router;
