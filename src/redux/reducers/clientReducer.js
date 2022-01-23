import {
  CREATE_CLIENT,
  RETRIEVE_CLIENTS,
  GET_CLIENT,
  UPDATE_CLIENT,
  DELETE_CLIENT,
  DELETE_ALL_CLIENTS,
  SET_CLIENT_EDITING,
} from "../actions/types";

const initialState = {
  clients: [],
  client: {},
  editing: false
};

function clientReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_CLIENT:
      return { ...state, clients: [ ...state.clients, payload ], editing: false };

    case RETRIEVE_CLIENTS:
      return {...state, clients: payload};
    
    case GET_CLIENT:
      return {...state, client: payload};

    case UPDATE_CLIENT:
      return {
        ...state,
        clients: state.clients.map((client) => {
        if (client.id === payload.id) {
          return {
            ...client,
            ...payload,
          };
        } else {
          return client;
        }
      }),
      editing: false
    }
    case DELETE_CLIENT:
      return {
        ...state,
        clients: state.clients.filter(({ id }) => id !== payload.id)
      };

    case DELETE_ALL_CLIENTS:
      return [];
    
    case SET_CLIENT_EDITING:
      return {
        ...state,
        client: {},
        editing: payload.id
      };

    default:
      return state;
  }
};

export default clientReducer;