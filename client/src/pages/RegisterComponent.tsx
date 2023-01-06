import { useState } from "react";
import UserService from "../services/userService";
import Form from "../components/Form";
import { Navigate } from "react-router-dom";

export default function RegisterComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const createUser = async function (e) {
    e.preventDefault();

    const { data } = await UserService.register(email, password);

    if (!data.errors) {
      setRedirect(true);
    } else {
      setEmailError(data.errors.email);
      setPasswordError(data.errors.password);
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
      {!redirect ? (
        <Form
          accountExist={false}
          name='Sign Up'
          email={email}
          password={password}
          handleEmail={handleEmail}
          handlePassword={handlePassword}
          userOp={(e) => createUser(e)}
          emailError={emailError}
          passwordError={passwordError}
        />
      ) : (
        <Navigate to='/login' />
      )}
      ote
    </>
  );
}

