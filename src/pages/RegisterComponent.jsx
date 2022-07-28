import { useState } from "react";
import UserService from "../services/userService";
import Form from "../components/Form";
import { Navigate } from "react-router-dom";

export default function RegisterComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const createUser = async function () {
    const newUser = await UserService.register(
      this.state.email,
      this.state.password
    );
    if (newUser) {
      setRedirect(true);
    } else {
      // some handler...
    }
  };

  const handleEmail = function (e) {
    setEmail(e.target.value);
  };

  const handlePassword = function (e) {
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
          userOp={createUser}
        />
      ) : (
        <Navigate to='/login' />
      )}
    </>
  );
}
