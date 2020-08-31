import axios from 'axios';
import * as actionType from '../actions/types';

/**
 * @desc Get current user profile
 */
export const getCurrentProfile = () => async (disatch) => {
  try {
    console.log('Heree');
    const res = await axios.get('api/profile/me');
    disatch({
      type: actionType.GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    disatch({
      type: actionType.PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
