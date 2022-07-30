import UserService from "../services/userService";
import Form from "../components/Form";
import { Navigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [isLoggedIn, setIsLoggedIn] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useContext(AuthContext);

  const authUser = async function () {
    const { data } = await UserService.auth(email, password);

    if (data["errors"] === undefined) {
      // save at and rt in local storage
      localStorage.setItem("at", data["accessToken"]);
      localStorage.setItem("rt", data["refreshToken"]);
      // add current user id to local storage
      setIsLoggedIn(true);
    } else {
      setEmailError(data.errors.find((err) => err.includes("email")));
      setPasswordError(data.errors.find((err) => err.includes("password")));
    }
  };

  const handleEmail = function (e) {
    setEmailError("");
    setEmail(e.target.value);
  };

  const handlePassword = function (e) {
    setPasswordError("");
    setPassword(e.target.value);
  };

  return (
    <>
      {!isLoggedIn ? (
        <Form
          accountExist={true}
          name='Login'
          email={email}
          password={password}
          handleEmail={handleEmail}
          handlePassword={handlePassword}
          userOp={authUser}
          emailError={emailError}
          passwordError={passwordError}
        />
      ) : (
        <Navigate to='/' />
      )}
    </>
  );
}
