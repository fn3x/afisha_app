import http from "../http-common"

const baseURL = "/users_events"

class UsersEventsDataService {
  getAll() {
    return http.get(`${baseURL}/user/`)
  }

  findByUserId(id) {
    return http.get(`${baseURL}/user/${id}`)
  }

  findByEventId(id) {
    return http.get(`${baseURL}/event/${id}`)
  }

  create(userId, eventId) {
    return http.get(`${baseURL}/userId/${userId}/eventId/${eventId}`)
  }

  update(id, data) {
    return http.put(`${baseURL}/user/${id}`, data)
  }

  delete(userEventId) {
    return http.delete(`${baseURL}/${userEventId}`)
  }

  deleteAll() {
    return http.delete(`${baseURL}`)
  }
}

export default new UsersEventsDataService()