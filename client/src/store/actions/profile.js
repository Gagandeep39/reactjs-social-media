import axios from 'axios';
import * as actionType from '../actions/types';
import { setAlert } from './alerts';

/**
 * @desc Get current user profile
 */
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');
    dispatch({
      type: actionType.GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: actionType.PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

/**
 * @desc Get all profiles
 */
export const getAllProfiles = () => async (dispatch) => {
  dispatch({
    type: actionType.CLEAR_PROFILE,
  });
  try {
    const res = await axios.get('/api/profile/');
    dispatch({
      type: actionType.GET_ALL_PROFILES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: actionType.PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

/**
 * @desc Get profile by ID
 */
export const getProfileById = (userId) => async (dispatch) => {
  try {
    console.log(userId);
    const res = await axios.get('/api/profile/user/' + userId);
    dispatch({
      type: actionType.GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: actionType.PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

/**
 * @desc Get Github Repos
 */
export const getGithubRepositories = (username) => async (dispatch) => {

  try {
    const res = await axios.get('/api/profile/github/' + username);
    dispatch({
      type: actionType.GET_ALL_PROFILES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: actionType.PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

/**
 * @desc Create or Update profile
 */
export const createOrUpdateProfile = (
  formData,
  history,
  edit = false
) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post('/api/profile', formData, config);
    dispatch({
      type: actionType.GET_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));
    if (!edit) history.push('/dashboard');
  } catch (error) {
    const errorArray = error.response.data.errors;
    errorArray.forEach((e) => dispatch(setAlert(e.msg, 'danger')));
    dispatch({
      type: actionType.PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

/**
 * @desc Add experience
 */
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.put('/api/profile/experience', formData, config);
    dispatch({
      type: actionType.UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Experience added', 'success'));
    history.push('/dashboard');
  } catch (error) {
    const errorArray = error.response.data.errors;
    errorArray.forEach((e) => dispatch(setAlert(e.msg, 'danger')));
    dispatch({
      type: actionType.PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

/**
 * @desc Add experience
 */
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.put('/api/profile/education', formData, config);
    dispatch({
      type: actionType.UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Education Added', 'success'));
    history.push('/dashboard');
  } catch (error) {
    const errorArray = error.response.data.errors;
    errorArray.forEach((e) => dispatch(setAlert(e.msg, 'danger')));
    dispatch({
      type: actionType.PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

/**
 * @desc Delete Experience
 */
export const deleteExperience = (expId) => async (dispatch) => {
  try {
    const res = await axios.delete('/api/profile/experience/' + expId);
    dispatch({
      type: actionType.UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Experience Removed', 'success'));
  } catch (error) {
    dispatch({
      type: actionType.PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

/**
 * @desc Delete Experience
 */
export const deleteEducation = (eduId) => async (dispatch) => {
  try {
    const res = await axios.delete('/api/profile/education/' + eduId);
    dispatch({
      type: actionType.UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Education Removed', 'success'));
  } catch (error) {
    dispatch({
      type: actionType.PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
