import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../store/actions/post';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

function CommentForm({ postId, addComment, errors }) {
  const [text, setText] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    addComment(postId, { text });
    setText('');
  };
  return (
    <div class='post-form'>
      <div>
        <h3>Leave A Comment</h3>
      </div>
      <form class='form my-1' onSubmit={handleSubmit}>
        <TextAreaFieldGroup
          placeholder='Reply to post'
          name='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
          error={errors.text}
        />
        <input type='submit' class='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  postId: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.error,
});

export default connect(mapStateToProps, { addComment })(CommentForm);
