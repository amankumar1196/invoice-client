import apiHandler from "../../utils/apiCaller";
import { setToastr } from "../actions/ToastrMessageActions";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CURRENT_USER,
} from "./types";

export const register = (data) => async (dispatch) => {
  try {
    const res = await apiHandler.post("/v1/auth/signup", data);

    dispatch({
      type: REGISTER_SUCCESS,
    });

    dispatch(setToastr('Sign up successfully', 'info'));

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

      dispatch(setToastr(message, 'danger'));

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

      dispatch(setToastr(message, 'danger'));

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

    return Promise.resolve(res.data);
  } catch (error) {
      const message =
        (error.res &&
          error.res.data &&
          error.res.data.message) ||
        error.message ||
        error.toString();

      dispatch(setToastr(message, 'danger'));

    return Promise.reject(error);
  }
};