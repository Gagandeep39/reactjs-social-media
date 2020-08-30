import * as actionType from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionType.REGISTER_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case actionType.REGISTER_FAIL:
      localStorage.removeItem('token', payload.token);
      return {
        ...state,
        token: null,
        isAuthenticated: null,
        loading: false,
      };
    default:
      return state;
  }
};
