import apiHandler from "../../utils/apiCaller";
import { setToastr } from "../actions/ToastrMessageActions";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_TOASTR,
  CURRENT_USER,
} from "./types";

export const register = (data) => async (dispatch) => {
  try {
    const res = await apiHandler.post("/v1/auth/signup", data);

    dispatch({
      type: REGISTER_SUCCESS,
    });

    dispatch({
      type: SET_TOASTR,
      payload: res.data.message,
    });

    return Promise.resolve(res.data);
  } catch (error) {
    const message =
        (error.res &&
          error.res.data &&
          error.res.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: REGISTER_FAIL,
      });

      dispatch({
        type: SET_TOASTR,
        payload: message,
      });

    return Promise.reject(error);
  }
};

export const login = (data) => async (dispatch) => {
  try {
    const res = await apiHandler.post("/v1/auth/signin", data);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user: res.data },
    });

    dispatch(setToastr('Logged in successfully', 'info'));

    return Promise.resolve(res.data);
  } catch (error) {
      const message =
        (error.res &&
          error.res.data &&
          error.res.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch(setToastr(error.response.data.message, 'danger'));

    return Promise.reject(error);
  }
};

export const logout = () => async (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

export const currentUser = () => async (dispatch) => {
  try {
    const res = await apiHandler.get("/v1/auth/current_user");

    dispatch({
      type: CURRENT_USER,
      payload: res.data,
    });

  } catch (err) {
    console.log(err);
  }
};