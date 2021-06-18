import { combineReducers } from "redux"
import users from "./users"
import events from "./events"
import users_events from "./users_events"

export default combineReducers({
  users, events, users_events
})
