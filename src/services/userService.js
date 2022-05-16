import axios from "axios";

class UserService {
  register(email, password) {
    return axios.post("http://localhost:3000/user", {
      email,
      password,
    });
  }
  auth(email, password) {
    return axios.post("http://localhost:3000/user/authenticate", {
      email,
      password,
    });
  }
}

export default new UserService();
