import {
  CREATE_MEMBER,
  RETRIEVE_MEMBERS,
  GET_MEMBER,
  UPDATE_MEMBER,
  DELETE_MEMBER,
  DELETE_ALL_MEMBER,
  SET_MEMBER_EDITING,
} from "../actions/types";

const initialState = {
  members: [],
  member: {},
  editing: false
};

function memberReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_MEMBER:
      return { ...state, members: [ ...state.members, payload ], editing: false };

    case RETRIEVE_MEMBERS:
      return {...state, members: payload};
    
    case GET_MEMBER:
      return {...state, client: payload};

    case UPDATE_MEMBER:
      return {
        ...state,
        members: state.members.map((client) => {
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
    
    case DELETE_MEMBER:
      return {
        ...state,
        members: state.members.filter(({ id }) => id !== payload.id)
      };

    case DELETE_ALL_MEMBER:
      return [];
    
    case SET_MEMBER_EDITING:
      return {
        ...state,
        client: !payload.id || payload.id == "new" ? {} : state.client,
        editing: payload.id
      };

    default:
      return state;
  }
};

export default clientReducer;