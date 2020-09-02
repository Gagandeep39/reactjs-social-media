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
      type: actionType.GET_POST,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    const errorArray = error.response.data.errors;
    errorArray.forEach((e) => dispatch(setAlert(e.msg, 'danger')));
    dispatch({
      type: actionType.REGISTER_FAIL,
    });
  }
};
