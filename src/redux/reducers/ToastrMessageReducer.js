import { SET_TOASTR, CLEAR_TOASTR } from "../actions/types";

const initialState = [];

function ToastrMessageReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_TOASTR:
      return [...state, payload];
    case CLEAR_TOASTR:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}

export default ToastrMessageReducer;