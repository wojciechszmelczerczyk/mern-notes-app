const { default: axios } = require("axios");

const refreshToken = async () => {
  return axios.get("http://localhost:3000/user/refresh-token", {
    withCredentials: true,
  });
};

module.exports = refreshToken;
