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
    <div class='container-fluid '>
      <div class='row' style={{ display: 'block' }}>
        <div class='card rounded-0'>
          <div class='card-horizontal'>
            <div class='img-square-wrapper'>
              <Link to={'/profile/' + user}>
                <img class='comment-round-img' src={avatar} alt='' />
              </Link>
            </div>
            <div class='card-body'>
              <p class='card-text'>
                {text}

                {!auth.loading && user === auth.user._id && (
                  <button
                    type='button'
                    style={{ float: 'right' }}
                    class='btn btn-danger'
                    onClick={() => deleteComment(postId, _id)}
                  >
                    <i class='fas fa-times'></i>
                  </button>
                )}
              </p>
            </div>
          </div>

          <div className='card-footer w-100 text-muted comment-footer'>
            Posted on <Moment format='DD-MM-YYYY'>{date}</Moment>
          </div>
        </div>
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
