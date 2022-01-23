import { SET_FILTER, CLEAR_FILTER } from "./types";

export const setFilter = (filter) => dispatch => {
  dispatch({
    type: SET_FILTER,
    payload: { filter }
  });
};

export const clearFilter = () => dispatch => {
  dispatch({
    type: CLEAR_FILTER
  });
};