import {
  CREATE_CLIENT,
  RETRIEVE_CLIENTS,
  GET_CLIENT,
  UPDATE_CLIENT,
  DELETE_CLIENT,
  DELETE_ALL_CLIENTS,
} from "../actions/types";

const initialState = {
  clients: [],
  client: {}
};

function clientReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_CLIENT:
      return {...state, payload};

    case RETRIEVE_CLIENTS:
      return {...state, clients: payload};
    
    case GET_CLIENT:
      return {...state, client: payload};

    case UPDATE_CLIENT:
      return state.map((client) => {
        if (client.id === payload.id) {
          return {
            ...client,
            ...payload,
          };
        } else {
          return client;
        }
      });

    case DELETE_CLIENT:
      return state.clients.filter(({ id }) => id !== payload.id);

    case DELETE_ALL_CLIENTS:
      return [];

    default:
      return state;
  }
};

export default clientReducer;