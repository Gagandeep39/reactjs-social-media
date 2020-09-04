const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Post = require('../../models/Post');
const Users = require('../../models/Users');
const passport = require('passport');
const authenticate = () => passport.authenticate('jwt', { session: false });

/**
 * @route POST /api/posts
 * @description Create a post
 * @access Private
 */
router.post(
  '/',
  [authenticate(), [body('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // -password will prevent password from fetching
      const user = await Users.findById(req.user.id).select('-password');
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: user.id,
      });

      const post = await newPost.save();
      res.json(post);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server Error');
    }
  }
);

/**
 * @route GET /api/posts
 * @description Fetch All Posts
 * @access Privte
 */
router.get(
  '/',
  authenticate(),
  async (req, res) => {
    try {
      const posts = await Post.find().sort({ date: -1 });
      res.json(posts);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server Error');
    }
  }
);

/**
 * @route GET /api/posts/:postId
 * @description Fetch Post by ID
 * @access Privte
 */
router.get('/:postId', authenticate(), async (req, res) => {
  try {
    const posts = await Post.findById(req.params.postId);
    if (!posts) return res.status(404).json({ msg: 'Post not found' });
    res.json(posts);
  } catch (error) {
    console.log(error.message);
    if (error.kind === 'ObjectId')
      return res.status(404).json({ msg: 'Post not found' });
    res.status(500).send('Server Error');
  }
});

/**
 * @route DELETE /api/posts/:postId
 * @description Delete Post by ID
 * @access Privte
 */
router.delete('/:postId', authenticate(), async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) return res.status(404).json({ msg: 'Post not found' });

    if (post.user.toString() !== req.user.id)
      res.status(401).json({ msg: 'User not authorized' });

    await post.remove();
    res.json({ msg: 'Post removed' });
  } catch (error) {
    if (error.kind === 'ObjectId')
      return res.status(404).json({ msg: 'Post not found' });
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route PUT /api/posts/like/:id
 * @description Like a post
 * @access Privte
 */
router.put('/like/:id', authenticate(), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    console.log(post.likes);
    // Chck if user already liked the  post
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    )
      return res.status(400).json({ msg: 'Post already Liked' });

    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route PUT /api/posts/unlike/:id
 * @description Unlike a post
 * @access Privte
 */
router.put('/unlike/:id', authenticate(), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    console.log(post.likes);
    // Chck if user already liked the  post
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    )
      return res.status(400).json({ msg: 'Post has not been liked yet' });

    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);
    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route PUT /api/posts/comment/:id
 * @description Comment in a post
 * @access Privte
 */
router.post(
  '/comment/:id',
  [authenticate(), [body('text', 'Text field cannot be empty').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await Users.findById(req.user.id);
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comments.unshift(newComment);
      await post.save();
      res.json(post.comments);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server Error');
    }
  }
);

/**
 * @route DELETE /api/posts/comment/:id/:commentId
 * @description Delete a comment
 * @access Privte
 */
router.delete('/comment/:id/:commentId', authenticate(), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const comment = post.comments.find(
      (comment) => comment.id === req.params.commentId
    );

    if (!comment) return res.status(404).json({ msg: "Comment doesn't exist" });

    // Check if user is deleting his own comment
    if (comment.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'User not authorised' });

    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.params.commentId);

    post.comments.splice(removeIndex, 1);
    await post.save();
    res.json(post.comments);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
