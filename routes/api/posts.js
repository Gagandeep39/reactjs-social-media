const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
const Users = require('../../models/Users');

/**
 * @route POST /api/posts
 * @description Create a post
 * @access Private
 */
router.post(
  '/',
  [auth, [body('text', 'Text is required').not().isEmpty()]],
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
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route GET /api/posts/:postId
 * @description Fetch Post by ID
 * @access Privte
 */
router.get('/:postId', auth, async (req, res) => {
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
router.delete('/:postId', auth, async (req, res) => {
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

module.exports = router;
