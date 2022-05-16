import { Component } from "react";
import UserService from "../services/userService";

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
  };

  async createUser() {
    await UserService.register(this.state.email, this.state.password);
  }

  handleEmail(e) {
    this.setState({ email: e.target.value });
  }

  handlePassword(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    return (
      <>
        <form>
          <label>email:</label>
          <input
            type='email'
            name='email'
            placeholder='email'
            value={this.state.email}
            onChange={this.handleEmail}
          ></input>
          <label>password:</label>
          <input
            type='password'
            name='password'
            placeholder='password'
            value={this.state.password}
            onChange={this.handlePassword}
          ></input>
        </form>
        <button onClick={this.createUser}>Submit</button>
      </>
    );
  }
}
