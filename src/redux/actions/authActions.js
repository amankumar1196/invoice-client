import apiHandler from "../../utils/apiCaller";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
} from "./types";

export const register = (data) => async (dispatch) => {
  try {
    const res = await apiHandler.post("/v1/auth/signup", data);

    dispatch({
      type: REGISTER_SUCCESS,
    });

    dispatch({
      type: SET_MESSAGE,
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
        type: SET_MESSAGE,
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

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

    return Promise.reject(error);
  }
};

export const logout = () => async (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};