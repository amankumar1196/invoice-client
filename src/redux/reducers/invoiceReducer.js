import {
  CREATE_INVOICE,
  RETRIEVE_INVOICES,
  GET_INVOICE,
  UPDATE_INVOICE,
  DELETE_INVOICE,
  DELETE_ALL_INVOICES,
  SET_INVOICE_EDITING
} from "../actions/types";

const initialState = {
  invoices: [],
  invoice: {},
  pagination: {},
  editing: false
};

function invoiceReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_INVOICE:
      return {...state, payload};

    case RETRIEVE_INVOICES:
      return { 
        ...state,
        invoices: payload.data,
        pagination: payload.pagination,
        editing: false
      };
      
    case GET_INVOICE:
      return {...state, invoice: payload};

    case UPDATE_INVOICE:
      return {
        ...state,
        invoices: state.invoices.map((invoice) => {
        if (invoice.id === payload.id) {
          return {
            ...invoice,
            ...payload,
          };
        } else {
          return invoice;
        }
      }),
      editing: false
    }
    
    case DELETE_INVOICE:
      return state.filter(({ id }) => id !== payload.id);

    case DELETE_ALL_INVOICES:
      return [];

    case SET_INVOICE_EDITING:
      return {
        ...state,
        invoice: !payload.id || payload.id == "new" ? {} : state.invoice,
        editing: payload.id
      };

    default:
      return state;
  }
};

export default invoiceReducer;