import * as actionType from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: false,
  user: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionType.START_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actionType.STOP_LOADING:
      return {
        ...state,
        loading: false,
      };
    case actionType.LOGIN_SUCCESS:
    case actionType.REGISTER_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case actionType.LOGIN_FAIL:
    case actionType.REGISTER_FAIL:
    case actionType.AUTH_ERROR:
    case actionType.LOGOUT:
    case actionType.DELETE_ACCOUNT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: null,
        loading: false,
        user: null,
      };
    case actionType.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    default:
      return state;
  }
};
