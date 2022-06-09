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
    const { status } = await UserService.auth(
      this.state.email,
      this.state.password
    );

    if (status === 201) {
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
