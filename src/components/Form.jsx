import { NavLink } from "react-router-dom";

const Form = ({
  accountExist,
  name,
  email,
  password,
  handleEmail,
  handlePassword,
  userOp,
  emailError,
  passwordError,
}) => {
  return (
    <>
      <form className='userForm'>
        <h1 className='formTitle'>Speech Notes</h1>
        <div className='form-group'>
          <label className='formLabel'>Email</label>
          <input
            className='form-control'
            type='email'
            name='email'
            placeholder='email'
            value={email}
            onChange={handleEmail}
          ></input>
          <div className='emailError'>
            {emailError ? emailError.match("Please enter a valid email") : ""}
          </div>
        </div>
        <div className='form-group'>
          <label className='formLabel'>Password</label>
          <input
            className='form-control'
            type='password'
            name='password'
            placeholder='password'
            value={password}
            onChange={handlePassword}
          ></input>
          <div className='passwordError'>
            {passwordError ? passwordError.match("Password is too short") : ""}
          </div>
        </div>

        {accountExist ? (
          <NavLink className='formLink' to='/register'>
            Don't have account? Sign Up!
          </NavLink>
        ) : (
          <NavLink className='formLink' to='/login'>
            Already have an account? Login!
          </NavLink>
        )}
      </form>
      <button className='userBtn btn btn-primary' onClick={userOp}>
        {name}
      </button>
    </>
  );
};

export default Form;
