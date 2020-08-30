import { v4 as uuid } from 'uuid';
import * as actionType from '../actions/types';

export const setAlert = (msg, alertType) => (dispatch) => {
  const id = uuid();
  dispatch({
    type: actionType.SET_ALERT,
    payload: { msg, alertType, id },
  });
};
