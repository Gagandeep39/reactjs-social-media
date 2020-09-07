import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllPosts } from '../../store/actions/post';
import Spinner from '../layouts/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';

const Posts = ({ getAllPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h4 class='display-4'>Posts</h4>
      <p class='lead'>
        <i class='fas fa-user'></i> Welcome to the community!
      </p>
      <PostForm />
      <div className='posts'>
        {posts.map((post) => (
          <PostItem post={post} key={post._id} />
        ))}
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getAllPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getAllPosts })(Posts);
