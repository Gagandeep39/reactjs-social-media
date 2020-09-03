import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPostById } from '../../store/actions/post';
import Spinner from '../layouts/Spinner';
import PostItem from '../posts/PostItem';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';

function Post({ getPostById, post: { post, loading }, match }) {
  useEffect(() => {
    getPostById(match.params.id);
  }, [getPostById, match.params.id]);
  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link className='btn' to='/posts'>
        Back
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
    </Fragment>
  );
}

Post.propTypes = {
  getPostById: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPostById })(Post);
