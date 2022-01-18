import {
  CREATE_INVOICE,
  RETRIEVE_INVOICES,
  UPDATE_INVOICE,
  DELETE_INVOICE,
  DELETE_ALL_INVOICES,
} from "../actions/types";

const initialState = {
  invoices: [],
  invoice: {}
};

function invoiceReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_INVOICE:
      return {...state, payload};

    case RETRIEVE_INVOICES:
      return {...state, invoices: payload};

    case UPDATE_INVOICE:
      return state.map((invoice) => {
        if (invoice.id === payload.id) {
          return {
            ...invoice,
            ...payload,
          };
        } else {
          return invoice;
        }
      });

    case DELETE_INVOICE:
      return state.filter(({ id }) => id !== payload.id);

    case DELETE_ALL_INVOICES:
      return [];

    default:
      return state;
  }
};

export default invoiceReducer;