import http from "../http-common"

const baseURL = "/users"

class UsersDataService {
  getAll() {
    return http.get(baseURL)
  }

  get(id) {
    return http.get(`${baseURL}/${id}`)
  }

  findByLogin(login) {
    return http.get(`${baseURL}/${login}`)
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

export default new UsersDataService()