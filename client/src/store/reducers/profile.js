import * as actionType from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionType.GET_PROFILE:
    case actionType.UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case actionType.GET_ALL_PROFILES:
      return {
        ...state,
        profiles: payload,
      };
    case actionType.PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case actionType.CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
        repos: [],
      };
    case actionType.GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false,
      };
    default:
      return state;
  }
};
