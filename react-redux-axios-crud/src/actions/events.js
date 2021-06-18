import {
  CREATE_EVENT,
  RETRIEVE_EVENTS,
  UPDATE_EVENT,
  DELETE_EVENT,
  DELETE_ALL_EVENTS
} from "./types"

import EventsDataService from "../services/events.service"

export const createEvent = (eventInfo) => async (dispatch) => {
  try {
    const res = await EventsDataService.create(eventInfo)

    dispatch({
      type: CREATE_EVENT,
      payload: res.data,
    })

    return Promise.resolve(res.data)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const retrieveEvents = () => async (dispatch) => {
  try {
    const res = await EventsDataService.getAll()

    dispatch({
      type: RETRIEVE_EVENTS,
      payload: res.data,
    })
  } catch (err) {
    console.log(err)
  }
}

export const updateEvent = (id, data) => async (dispatch) => {
  try {
    const res = await EventsDataService.update(id, data)

    dispatch({
      type: UPDATE_EVENT,
      payload: data,
    })

    return Promise.resolve(res.data)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const deleteEvent = (id) => async (dispatch) => {
  try {
    await EventsDataService.delete(id)

    dispatch({
      type: DELETE_EVENT,
      payload: { id },
    })
  } catch (err) {
    console.log(err)
  }
}

export const deleteAllEvents = () => async (dispatch) => {
  try {
    const res = await EventsDataService.deleteAll()

    dispatch({
      type: DELETE_ALL_EVENTS,
      payload: res.data,
    })

    return Promise.resolve(res.data)
  } catch (err) {
    return Promise.reject(err)
  }
}