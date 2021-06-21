import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  async login(login, password) {
    const response = await axios
      .post(API_URL + "signin", { login, password });
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, login, password, category) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      login,
      password,
      category
    });
  }
}

export default new AuthService();