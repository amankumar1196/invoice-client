import {
  SET_FILTER,
  CLEAR_FILTER
} from "../actions/types";

const initialState = {
  sortBy: "createdAt",
  sortDirection: "DESC",
  page: 1,
  rpp: 5,
  include: [],
  extraParams: {}
};

function filterReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_FILTER:
      return { ...payload.filter };

    case CLEAR_FILTER:
      return initialState;
    
    default:
      return state;
  }
};

export default filterReducer;