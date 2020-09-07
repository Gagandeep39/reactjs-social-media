import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { addLike, removeLike, deletePost } from '../../store/actions/post';

function PostItem({
  auth,
  post: { _id, name, text, avatar, user, likes, comments, date },
  addLike,
  removeLike,
  deletePost,
  showActions,
}) {
  return (
    <div class='container-fluid'>
      <div class='row' style={{display: 'block'}}>
        <div class='mt-3'>
          <div class='card'>
            <div class='card-horizontal'>
              <div class='img-square-wrapper'>
                <Link to={'/profile/' + user}>
                  <img class='round-img' src={avatar} alt='' />
                </Link>
              </div>
              <div class='card-body'>
                <h4 class='card-title'>{name}</h4>
                <p class='card-text'>{text}</p>
                {showActions && (
          <Fragment>
            <button
              onClick={() => addLike(_id)}
              type='button'
              class='btn btn-light m-1'
            >
              <i class='fas fa-thumbs-up'></i>
              {likes.length > 0 && <span> {likes.length} </span>}
            </button>
            <button
              onClick={() => removeLike(_id)}
              type='button'
              class='btn btn-light m-1'
            >
              <i class='fas fa-thumbs-down'></i>
            </button>
            <Link to={'/posts/' + _id} class='btn btn-primary m-1'>
              Discussion{' '}
              {comments.length > 0 && (
                <span class='badge badge-light'> {comments.length} </span>
              )}
            </Link>
            {!auth.loading && user === auth.user._id && (
              <button
                onClick={() => deletePost(_id)}
                type='button'
                class='btn btn-danger m-1'
              >
                <i class='fas fa-times'></i>
              </button>
            )}
          </Fragment>
        )}
              </div>
            </div>
            
            <div className='card-footer w-100 text-muted'>
            Posted on <Moment format='DD-MM-YYYY'>{date}</Moment>{' '}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
