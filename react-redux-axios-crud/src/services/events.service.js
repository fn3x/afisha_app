import http from "../http-common"

const baseURL = "/events"

class EventsDataService {
  getAll() {
    return http.get(baseURL)
  }

  get(id) {
    return http.get(`${baseURL}/${id}`)
  }

  findByTitle(title) {
    return http.get(`${baseURL}/${title}`)
  }

  create(data) {
    return http.post(baseURL, data)
  }

  update(id, data) {
    return http.put(`${baseURL}/${id}`, data)
  }

  delete(id) {
    return http.delete(`${baseURL}/${id}`)
  }

  deleteAll() {
    return http.delete(baseURL)
  }
}

export default new EventsDataService()