import axios from 'axios';
import * as actionType from '../actions/types';
import { setAlert } from './alerts';
import setAuthToken from '../../utils/setAuthToken';

/**
 * @desc Register User
 */
export const register = ({ name, email, password, password2 }) => async (dispatch) => {
  dispatch({type: actionType.START_LOADING});
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name, email, password, password2 });
  try {
    const res = await axios.post('/api/users/register', body, config);
    dispatch({
      type: actionType.REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (error) {
    dispatch({type: actionType.STOP_LOADING});
    dispatch({
      type: actionType.GET_ERRORS,
      payload: error.response.data
    })

    setTimeout(() => {
      dispatch({type: actionType.CLEAR_ERRORS})
    }, 3000);
  }
};

/**
 * @desc Load User data such as name, email, avatar etc using token
 */
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) setAuthToken(localStorage.token);
  try {
    const res = await axios.get('/api/users/');
    dispatch({
      type: actionType.USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: actionType.AUTH_ERROR,
    });
  }
};

/**
 * @desc Login User
 */
export const login = (email, password) => async (dispatch) => {
  dispatch({type: actionType.START_LOADING});
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post('/api/users/login', body, config);
    dispatch({
      type: actionType.LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({type: actionType.STOP_LOADING});
    dispatch({
      type: actionType.GET_ERRORS,
      payload: error.response.data
    })
    setTimeout(() => {
      dispatch({type: actionType.CLEAR_ERRORS})
    }, 3000);
    // dispatch(loadUser());
  }
};

/**
 * @desc Logout
 */
export const logout = () => async (dispatch) => {
  dispatch({ type: actionType.CLEAR_PROFILE });
  dispatch({ type: actionType.LOGOUT });
};

/**
 * @desc Delete account, Experience
 */
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Delete Account, this cannot be undone')) {
    try {
      await axios.delete('/api/profile');
      dispatch({ type: actionType.CLEAR_PROFILE });
      dispatch({ type: actionType.DELETE_ACCOUNT });
      dispatch(setAlert('Your account has been permanently deleted'));
    } catch (error) {
      dispatch({
        type: actionType.PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  }
};
