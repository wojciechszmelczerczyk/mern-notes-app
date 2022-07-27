import { Component } from "react";
import UserService from "../services/userService";
import Form from "../components/Form";
import { Navigate } from "react-router-dom";

export default class LoginComponent extends Component {
  constructor(props) {
    super(props);

    this.authUser = this.authUser.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  state = {
    email: "",
    password: "",
    redirect: false,
  };

  async authUser() {
    const { status, data } = await UserService.auth(
      this.state.email,
      this.state.password
    );

    if (status === 201) {
      // save at and rt in local storage
      localStorage.setItem("at", data["accessToken"]);
      localStorage.setItem("rt", data["refreshToken"]);
      // add current user id to local storage
      this.setState({ redirect: true });
    } else {
      // some handler...
    }
  }

  handleEmail(e) {
    this.setState({ email: e.target.value });
  }

  handlePassword(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    let { redirect } = this.state;

    return (
      <>
        {!redirect ? (
          <Form
            accountExist={true}
            name='Login'
            email={this.state.email}
            password={this.state.password}
            handleEmail={this.handleEmail}
            handlePassword={this.handlePassword}
            userOp={this.authUser}
          />
        ) : (
          <Navigate to='/' />
        )}
      </>
    );
  }
}
