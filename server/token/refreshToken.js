const { default: axios } = require("axios");

const refreshToken = async () => {
  // fetch user id from local storage

  // refresh token, id send in order to sign new access token with current user id
  return await axios.get("http://localhost:3000/refresh-token", {
    withCredentials: true,
  });
};

module.exports = refreshToken;
