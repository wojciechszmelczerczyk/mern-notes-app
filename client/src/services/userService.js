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

  logout(at) {
    return axios.delete("http://localhost:3000/user", {
      headers: {
        Authorization: `Bearer ${at}`,
      },
    });
  }

  refreshToken(rt) {
    return axios.get("http://localhost:3000/user/refresh-token", {
      headers: {
        Authorization: `Bearer ${rt}`,
      },
      withCredentials: true,
    });
  }
}

export default new UserService();
