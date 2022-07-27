import { Component } from "react";
import UserService from "../services/userService";
import Form from "../components/Form";
import { Navigate } from "react-router-dom";

export default class RegisterComponent extends Component {
  constructor(props) {
    super(props);

    this.createUser = this.createUser.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  state = {
    email: "",
    password: "",
    redirect: false,
  };

  async createUser() {
    const newUser = await UserService.register(
      this.state.email,
      this.state.password
    );
    if (newUser) {
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
            accountExist={false}
            name='Sign Up'
            email={this.state.email}
            password={this.state.password}
            handleEmail={this.handleEmail}
            handlePassword={this.handlePassword}
            userOp={this.createUser}
          />
        ) : (
          <Navigate to='/login' />
        )}
      </>
    );
  }
}
