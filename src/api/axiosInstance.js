import axios from "axios";
import userService from "../services/userService";

const BASE_URL = "http://localhost:3000";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const rt = localStorage.getItem("rt");

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error?.config;
    if (error?.response.status === 403 && !prevRequest?.sent) {
      prevRequest.sent = true;
      try {
        const { data } = await userService.refreshToken(rt);
        localStorage.setItem("at", data.accessToken);
        return axiosInstance(prevRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }
  },
  (err) => Promise.reject(err)
);

export default axiosInstance;
