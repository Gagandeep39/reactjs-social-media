const { validationResult } = require('express-validator');
const Post = require('../models/Post');
const Users = require('../models/Users');

exports.createPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  Users.findById(req.user.id)
    .select('-password')
    .then((user) => {
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: user.id,
      });
      newPost.save().then((post) => res.json(post));
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).send('Server Error');
    });
};

exports.fetchAllPosts = async (req, res) => {
  await Post.find()
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch((error) => {
      console.log(error.message);
      res.status(500).send('Server Error');
    });
};

exports.fetchPostById = async (req, res) => {
  Post.findById(req.params.postId)
    .then((posts) => {
      if (!posts) return res.status(404).json({ msg: 'Post not found' });
      res.json(posts);
    })
    .catch((error) => {
      console.log(error.message);
      if (error.kind === 'ObjectId')
        return res.status(404).json({ msg: 'Post not found' });
      res.status(500).send('Server Error');
    });
};

exports.deletePostById = async (req, res) => {
  Post.findById(req.params.postId)
    .then((post) => {
      if (!post) return res.status(404).json({ msg: 'Post not found' });

      if (post.user.toString() !== req.user.id)
        res.status(401).json({ msg: 'User not authorized' });

      post.remove().then(() => res.json({ msg: 'Post removed' }));
    })
    .catch((error) => {
      if (error.kind === 'ObjectId')
        return res.status(404).json({ msg: 'Post not found' });
      console.log(error.message);
      res.status(500).send('Server Error');
    });
};

exports.likePost = async (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (
        post.likes.filter((like) => like.user.toString() === req.user.id)
          .length > 0
      )
        return res.status(400).json({ msg: 'Post already Liked' });

      post.likes.unshift({ user: req.user.id });
      post.save().then(() => res.json(post.likes));
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).send('Server Error');
    });
};

exports.unlikePost = async (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (
        post.likes.filter((like) => like.user.toString() === req.user.id)
          .length === 0
      )
        return res.status(400).json({ msg: 'Post has not been liked yet' });

      const removeIndex = post.likes
        .map((like) => like.user.toString())
        .indexOf(req.user.id);
      post.likes.splice(removeIndex, 1);
      post.save().then(() => res.json(post.likes));
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).send('Server Error');
    });
};

exports.commentOnPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  Users.findById(req.user.id)
    .then((user) => {
      Post.findById(req.params.id).then((post) => {
        const newComment = {
          text: req.body.text,
          name: user.name,
          avatar: user.avatar,
          user: req.user.id,
        };

        post.comments.unshift(newComment);
        post.save().then(() => res.json(post.comments));
      });
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).send('Server Error');
    });
};

exports.deleteComment = async (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      const comment = post.comments.find(
        (comment) => comment.id === req.params.commentId
      );

      if (!comment)
        return res.status(404).json({ msg: "Comment doesn't exist" });

      // Check if user is deleting his own comment
      if (comment.user.toString() !== req.user.id)
        return res.status(401).json({ msg: 'User not authorised' });

      const removeIndex = post.comments
        .map((comment) => comment.user.toString())
        .indexOf(req.params.commentId);

      post.comments.splice(removeIndex, 1);
      post.save().then(() => res.json(post.comments));
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).send('Server Error');
    });
};
