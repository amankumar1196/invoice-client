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

export const register = (data, filters) => async (dispatch) => {
  try {
    const res = await apiHandler("POST", "/v1/auth/signup", filters, data);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(setToastr('Sign up successfully', 'info'));

    return Promise.resolve(res.data);
  } catch (error) {
    const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

        dispatch({
        type: REGISTER_FAIL,
      });

      dispatch(setToastr(message, 'danger'));

    return Promise.reject(error);
  }
};

export const login = (data, filters) => async (dispatch) => {
  try {
    const res = await apiHandler("POST", "/v1/auth/signin", filters, data);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user: res.data },
    });

    dispatch(setToastr('Logged in successfully', 'info'));

    return Promise.resolve(res.data);
  } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
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

export const getCurrentUser = (filters) => async (dispatch) => {
  try {
    const res = await apiHandler("GET", "/v1/auth/current_user", filters);

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