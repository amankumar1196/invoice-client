import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CURRENT_USER,
} from "../actions/types";

const initialState = { isLoggedIn: false, user: null };

function authReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      localStorage.setItem("access-token", payload.user.accessToken);
      
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("access-token", payload.user.accessToken);

      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case CURRENT_USER:
      return {
        ...state,
        // isLoggedIn: true,
        user: payload,
      }
    case LOGOUT:
      localStorage.removeItem("access-token");
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
}

export default authReducer;