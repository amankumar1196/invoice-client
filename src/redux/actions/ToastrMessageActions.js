import { SET_TOASTR, CLEAR_TOASTR } from "./types";
import { v4 as uuidv4 } from 'uuid';

export const setToastr = (msg, alertType, timeout = 5000) => dispatch => {
  const id = uuidv4();
  dispatch({
    type: SET_TOASTR,
    payload: { msg, alertType, id }
  });

  setTimeout(() => dispatch(clearToastr(id)), timeout);
};

export const clearToastr = (id) => ({
  type: CLEAR_TOASTR,
  payload: id
});