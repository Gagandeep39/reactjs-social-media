import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllPosts } from '../../store/actions/post';
import Spinner from '../layouts/Spinner';

const Posts = ({ getAllPosts, post: { post, loading } }) => {
  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);
  return <Fragment></Fragment>;
};

Posts.propTypes = {
  getAllPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getAllPosts })(Posts);
