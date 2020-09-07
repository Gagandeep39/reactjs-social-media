import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPost } from '../../store/actions/post';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

function PostForm({ createPost, errors }) {
  const [text, setText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    createPost({ text });
    setText('');
  };

  return (
    <div className='card'>
      <div className='card-body'>
        <h5> Say Something...</h5>
        <hr />

        <form class='form my-1' onSubmit={handleSubmit}>
          <TextAreaFieldGroup
            name='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='Create a post'
            error={errors.text}
          />
          <input type='submit' class='btn btn-dark my-1' value='Submit' />
        </form>
      </div>
    </div>
  );
}

PostForm.propTypes = {
  createPost: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.error,
});

export default connect(mapStateToProps, { createPost })(PostForm);
