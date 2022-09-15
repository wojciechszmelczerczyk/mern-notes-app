import axiosInstance from "../api/axiosInstance";

class UserService {
  register(email, password) {
    return axiosInstance.post("/user", {
      email,
      password,
    });
  }

  auth(email, password) {
    return axiosInstance.post(
      "/user/authenticate",
      {
        email,
        password,
      },
      { withCredentials: true }
    );
  }

  logout(at) {
    return axiosInstance.delete("/user", {
      headers: {
        Authorization: `Bearer ${at}`,
      },
    });
  }

  refreshToken(rt) {
    return axiosInstance.get("/user/refresh-token", {
      headers: {
        Authorization: `Bearer ${rt}`,
      },
      withCredentials: true,
    });
  }
}

export default new UserService();
