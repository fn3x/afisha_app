import {
  CREATE_USER_EVENT,
  RETRIEVE_USER_EVENTS,
  RETRIEVE_EVENT_USERS,
  UPDATE_USER_EVENT,
  DELETE_USER_EVENT,
  DELETE_ALL_USERS_EVENTS
} from "./types";

import UsersEventsDataService from "../services/users_events.service";

export const addEventToUser = (eventId, userId) => async (dispatch) => {
  try {
    const res = await UsersEventsDataService.create(userId, eventId);

    dispatch({
      type: CREATE_USER_EVENT,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getEventsForUser = (userId) => async (dispatch) => {
  try {
    const res = await UsersEventsDataService.findByUserId(userId);

    dispatch({
      type: RETRIEVE_USER_EVENTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getUsersForEvents = (eventId) => async (dispatch) => {
  try {
    const res = await UsersEventsDataService.findByEventId(eventId);

    dispatch({
      type: RETRIEVE_EVENT_USERS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateUserEvent = (id, data) => async (dispatch) => {
  try {
    const res = await UsersEventsDataService.update(id, data);

    dispatch({
      type: UPDATE_USER_EVENT,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteUsersEvents = (userId) => async (dispatch) => {
  try {
    await UsersEventsDataService.delete(userId);

    dispatch({
      type: DELETE_USER_EVENT,
      payload: { userId },
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteAllUsers = () => async (dispatch) => {
  try {
    const res = await UsersEventsDataService.deleteAll();

    dispatch({
      type: DELETE_ALL_USERS_EVENTS,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};