import { combineReducers } from "redux"
import users from "./users"
import events from "./events"
import users_events from "./users_events"
import auth from "./auth"
import message from "./message"

export default combineReducers({
  users, events, users_events, auth, message
})
