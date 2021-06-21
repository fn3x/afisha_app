import {
  CREATE_USER_EVENT,
  RETRIEVE_USER_EVENTS,
  RETRIEVE_EVENT_USERS,
  UPDATE_USER_EVENT,
  DELETE_USER_EVENT,
  DELETE_ALL_USERS_EVENTS
} from "./types"

import UsersEventsDataService from "../services/users_events_db.service"

export const addEventToUser = (userId, eventId) => async (dispatch) => {
  try {
    const res = await UsersEventsDataService.create(userId, eventId)

    dispatch({
      type: CREATE_USER_EVENT,
      payload: res.data,
    })

    return Promise.resolve(res.data)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const getEventsForUser = (userId) => async (dispatch) => {
  try {
    const res = await UsersEventsDataService.findByUserId(userId)

    dispatch({
      type: RETRIEVE_USER_EVENTS,
      payload: res.data.events,
    })

    return Promise.resolve(res.data.events)
  } catch (err) {
    console.log(err)
  }
}

export const getUsersForEvents = (eventId) => async (dispatch) => {
  try {
    const res = await UsersEventsDataService.findByEventId(eventId)

    dispatch({
      type: RETRIEVE_EVENT_USERS,
      payload: res.data,
    })
  } catch (err) {
    console.log(err)
  }
}

export const updateUserEvent = (id, data) => async (dispatch) => {
  try {
    const res = await UsersEventsDataService.update(id, data)

    dispatch({
      type: UPDATE_USER_EVENT,
      payload: data,
    })

    return Promise.resolve(res.data)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const deleteEventForUser = (userEventId) => async (dispatch) => {
  try {
    await UsersEventsDataService.delete(userEventId)

    dispatch({
      type: DELETE_USER_EVENT,
      payload: { userEventId },
    })
  } catch (err) {
    console.log(err)
  }
}

export const deleteAllUsers = () => async (dispatch) => {
  try {
    const res = await UsersEventsDataService.deleteAll()

    dispatch({
      type: DELETE_ALL_USERS_EVENTS,
      payload: res.data,
    })

    return Promise.resolve(res.data)
  } catch (err) {
    return Promise.reject(err)
  }
}