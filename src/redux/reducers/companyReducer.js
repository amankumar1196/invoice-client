import {
  CREATE_COMPANY,
  RETRIEVE_COMPANIES,
  GET_COMPANY,
  UPDATE_COMPANY,
  DELETE_COMPANY,
  DELETE_ALL_COMPANIES,
  SET_COMPANY_EDITING,
} from "../actions/types";

const initialState = {
  companies: [],
  company: {}
};

function companyReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_COMPANY:
      return { ...state, companies: [ ...state.companies, payload ], editing: false };

    case RETRIEVE_COMPANIES:
      return {...state, companies: payload};
    
    case GET_COMPANY:
      return {...state, company: payload};

      case UPDATE_COMPANY:
        return {
          ...state,
          companies: state.companies.map((company) => {
          if (company.id === payload.id) {
            return {
              ...company,
              ...payload,
            };
          } else {
            return company;
          }
        }),
        editing: false
      }

    case DELETE_COMPANY:
      return {
        ...state,
        companies: state.companies.filter(({ id }) => id !== payload.id)
      };

    case DELETE_ALL_COMPANIES:
      return [];
      
    case SET_COMPANY_EDITING:
      return {
        ...state,
        company: !payload.id || payload.id == "new" ? {} : state.company,
        editing: payload.id
      };
    default:
      return state;
  }
};

export default companyReducer;