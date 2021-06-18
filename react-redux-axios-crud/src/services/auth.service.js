import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(username, login, password) {
    return axios
      .post(API_URL + "signin", { username, login, password })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, login, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      login,
      password
    });
  }
}

export default new AuthService();