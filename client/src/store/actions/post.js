import axios from 'axios';
import * as actionType from '../actions/types';
import { setAlert } from './alerts';

/**
 * @desc Fetch All posts
 */
export const getAllPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/posts');
    console.log(res);
    dispatch({
      type: actionType.GET_POSTS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: actionType.POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

/**
 * @desc Add likes
 */
export const addLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put('/api/posts/like/' + postId);
    dispatch({
      type: actionType.UPDATE_LIKES,
      payload: { postId, likes: res.data },
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: actionType.POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

/**
 * @desc RemoveLike likes
 */
export const removeLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put('/api/posts/unlike/' + postId);
    dispatch({
      type: actionType.UPDATE_LIKES,
      payload: { postId, likes: res.data },
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: actionType.POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

/**
 * @desc Delete posts
 */
export const deletePost = (postId) => async (dispatch) => {
  try {
    await axios.delete('/api/posts/' + postId);
    dispatch({
      type: actionType.DELETE_POST,
      payload: postId,
    });
    dispatch(setAlert('Post Removed', 'success'));
  } catch (error) {
    console.log(error);
    dispatch({
      type: actionType.POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

/**
 * @desc Create Post
 */
export const createPost = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post('/api/posts/', formData, config);
    dispatch({
      type: actionType.ADD_POST,
      payload: res.data,
    });
    dispatch(setAlert('Post Created', 'success'));
  } catch (error) {
    console.log(error);
    dispatch({
      type: actionType.POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

/**
 * @desc Get single post by ID
 */
export const getPostById = (postId) => async (dispatch) => {
  try {
    const res = await axios.get('/api/posts/' + postId);
    dispatch({
      type: actionType.GET_POST,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: actionType.POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
