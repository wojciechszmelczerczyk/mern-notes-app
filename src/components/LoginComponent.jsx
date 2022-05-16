import { Component } from "react";
import UserService from "../services/userService";
import Form from "../components/Form";

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
  };

  async authUser() {
    const x = await UserService.auth(this.state.email, this.state.password);
    console.log(x);
  }

  handleEmail(e) {
    this.setState({ email: e.target.value });
  }

  handlePassword(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    return (
      <Form
        email={this.state.email}
        password={this.state.password}
        handleEmail={this.handleEmail}
        handlePassword={this.handlePassword}
        userOp={this.authUser}
      />
    );
  }
}
