import axios from 'axios';
import * as actionType from '../actions/types';
import { setAlert } from './alerts';
import setAuthToken from '../../utils/setAuthToken';

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
    dispatch(loadUser());
  } catch (error) {
    const errorArray = error.response.data.errors;
    errorArray.forEach((e) => dispatch(setAlert(e.msg, 'danger')));
    dispatch({
      type: actionType.REGISTER_FAIL,
    });
  }
};

/**
 * @desc Load User data such as name, email, avatar etc using token
 */
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) setAuthToken(localStorage.token);
  try {
    const res = await axios.get('/api/auth');
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
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post('/api/auth', body, config);
    dispatch({
      type: actionType.LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const errorArray = error.response.data.errors;
    errorArray.forEach((e) => dispatch(setAlert(e.msg, 'danger')));
    dispatch({
      type: actionType.LOGIN_FAIL,
    });
    dispatch(loadUser());
  }
};

/**
 * @desc Logout
 */
export const logout = () => async (dispatch) => {
  dispatch({ type: actionType.LOGOUT });
};
