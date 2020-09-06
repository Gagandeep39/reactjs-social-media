const express = require('express');
const router = express.Router();
const postsController = require('../../controllers/posts');
const passport = require('passport');
const authenticate = () => passport.authenticate('jwt', { session: false });

/**
 * @route POST /api/posts
 * @description Create a new Post
 */
router.post('/', authenticate(), postsController.createPost);

/**
 * @route GET /api/posts
 * @description Fetch all posts
 */
router.get('/', authenticate(), postsController.fetchAllPosts);

/**
 * @route GET /api/posts/:postId
 * @description Fetch post by ID
 */
router.get('/:postId', authenticate(), postsController.fetchPostById);

/**
 * @route DELETE /api/posts/:postId
 * @description delete post by ID
 */
router.delete('/:postId', authenticate(), postsController.deletePostById);

/**
 * @route PUT /api/posts/like/:id
 * @description Like a post
 */
router.put('/like/:id', authenticate(), postsController.likePost);

/**
 * @route PUT /api/posts/unlike/:id
 * @description Like a post
 */
router.put('/unlike/:id', authenticate(), postsController.unlikePost);

/**
 * @route POST /api/posts/comment/:id
 * @description Create comment on a post
 */
router.post('/comment/:id', authenticate(), postsController.commentOnPost);

/**
 * @route POST /api/posts/comment/:id/:commentId
 * @description Delete comment from a post
 */
router.delete(
  '/comment/:id/:commentId',
  authenticate(),
  postsController.deleteComment
);

module.exports = router;
