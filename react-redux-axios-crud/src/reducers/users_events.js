import {
  CREATE_USER_EVENT,
  RETRIEVE_USER_EVENTS,
  RETRIEVE_EVENT_USERS,
  UPDATE_USER_EVENT,
  DELETE_USER_EVENT,
  DELETE_ALL_USERS_EVENTS
} from "../actions/types";

const initialState = [];

function usersEventsReducer(usersEvents = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_USER_EVENT:
      return [...usersEvents, payload];

    case RETRIEVE_USER_EVENTS:
      return payload;

    case RETRIEVE_EVENT_USERS:
      return payload;

    case UPDATE_USER_EVENT:
      return usersEvents.map((event) => {
        if (event.id === payload.id) {
          return {
            ...event,
            ...payload,
          };
        } else {
          return event;
        }
      });

    case DELETE_USER_EVENT:
      return usersEvents.filter(({ id }) => id !== payload.id);

    case DELETE_ALL_USERS_EVENTS:
      return [];

    default:
      return usersEvents;
  }
};

export default usersEventsReducer;