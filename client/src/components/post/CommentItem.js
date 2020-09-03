import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteComment } from '../../store/actions/post';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

function CommentItem({
  postId,
  comment: { _id, name, user, avatar, text, date },
  deleteComment,
  auth,
}) {
  return (
    <div class='post bg-white p-1 my-1'>
      <div>
        <Link to={'/profile/' + user}>
          <img class='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p class='my-1'>{text}</p>
        <p class='post-date'>
          Posted on <Moment format='DD-MM-YYYY'>{date}</Moment>
        </p>
        {!auth.loading && user === auth.user._id && (
          <button
            type='button'
            class='btn btn-danger'
            onClick={() => deleteComment(postId, _id)}
          >
            <i class='fas fa-times'></i> Delete
          </button>
        )}
      </div>
    </div>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  deleteComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
