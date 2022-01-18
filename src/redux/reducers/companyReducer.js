import {
  CREATE_COMPANY,
  RETRIEVE_COMPANIES,
  GET_COMPANY,
  UPDATE_COMPANY,
  DELETE_COMPANY,
  DELETE_ALL_COMPANIES,
} from "../actions/types";

const initialState = {
  companies: [],
  company: {}
};

function companyReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_COMPANY:
      return {...state, payload};

    case RETRIEVE_COMPANIES:
      return {...state, companies: payload};
    
    case GET_COMPANY:
      return {...state, company: payload};

    case UPDATE_COMPANY:
      return state.companies.map((company) => {
        if (company.id === payload.id) {
          return {
            ...company,
            ...payload,
          };
        } else {
          return company;
        }
      });

    case DELETE_COMPANY:
      return {
        ...state,
        companies: state.companies.filter(({ id }) => id !== payload.id)
      };

    case DELETE_ALL_COMPANIES:
      return [];

    default:
      return state;
  }
};

export default companyReducer;