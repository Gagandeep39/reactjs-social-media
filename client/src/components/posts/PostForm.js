import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPost } from '../../store/actions/post';

function PostForm({ createPost }) {
  const [text, setText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    createPost({ text });
    setText('');
  };

  return (
    <div class='post-form'>
      <div class='bg-primary p'>
        <h3>Say Something...</h3>
      </div>
      <form class='form my-1' onSubmit={handleSubmit}>
        <textarea
          name='text'
          cols='30'
          rows='5'
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='Create a post'
          required
        ></textarea>
        <input type='submit' class='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
}

PostForm.propTypes = {
  createPost: PropTypes.func.isRequired,
};

export default connect(null, { createPost })(PostForm);
