import axios from 'axios';
import * as actionType from '../actions/types';

/**
 * @desc Register User
 */
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post('/api/users', body, config);
    dispatch({
      type: actionType.REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: actionType.REGISTER_FAIL,
    });
  }
};
