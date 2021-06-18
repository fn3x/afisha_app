import {
  CREATE_USER,
  RETRIEVE_USERS,
  FIND_USER,
  UPDATE_USER,
  DELETE_USER,
  DELETE_ALL_USERS
} from "./types"

import UsersDataService from "../services/users.service"

export const createUser = (userInfo) => async (dispatch) => {
  try {
    const res = await UsersDataService.create(userInfo)

    dispatch({
      type: CREATE_USER,
      payload: res.data,
    })

    return Promise.resolve(res.data)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const findByLogin = (login) => async (dispatch) => {
  try {
    const res = await UsersDataService.findByLogin(login)

    dispatch({
      type: FIND_USER,
      payload: res.data,
    })

    return Promise.resolve(res.data)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const retrieveUsers = () => async (dispatch) => {
  try {
    const res = await UsersDataService.getAll()

    dispatch({
      type: RETRIEVE_USERS,
      payload: res.data,
    })
  } catch (err) {
    console.log(err)
  }
}

export const updateUser = (id, data) => async (dispatch) => {
  try {
    const res = await UsersDataService.update(id, data)

    dispatch({
      type: UPDATE_USER,
      payload: data,
    })

    return Promise.resolve(res.data)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const deleteUser = (id) => async (dispatch) => {
  try {
    await UsersDataService.delete(id)

    dispatch({
      type: DELETE_USER,
      payload: { id },
    })
  } catch (err) {
    console.log(err)
  }
}

export const deleteAllUsers = () => async (dispatch) => {
  try {
    const res = await UsersDataService.deleteAll()

    dispatch({
      type: DELETE_ALL_USERS,
      payload: res.data,
    })

    return Promise.resolve(res.data)
  } catch (err) {
    return Promise.reject(err)
  }
}