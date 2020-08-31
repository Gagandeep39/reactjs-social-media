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
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case actionType.PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};
