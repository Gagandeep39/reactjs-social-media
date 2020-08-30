import uuid from 'uuid';
import * as actionType from '../actions/types';

export const setAlert = (msg, alertType) => (dispatch) => {
  const id = uuid.v4();
  dispatch({
    type: actionType.SET_ALERT,
    payload: { msg, alertType, id },
  });
};
