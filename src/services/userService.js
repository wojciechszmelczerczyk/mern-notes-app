import axios from "axios";

class UserService {
  register(email, password) {
    return axios.post("http://localhost:3000/user", {
      email,
      password,
    });
  }
  auth(email, password) {
    return axios.post(
      "http://localhost:3000/user/authenticate",
      {
        email,
        password,
      },
      { withCredentials: true }
    );
  }

  logout() {
    return axios.delete("http://localhost:3000/user");
  }
}

export default new UserService();
