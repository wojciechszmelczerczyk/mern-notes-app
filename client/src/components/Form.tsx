import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

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
  const [isDarkDefault] = useContext(ThemeContext);

  return (
    <>
      <form
        className='userForm'
        style={{
          boxShadow: isDarkDefault
            ? "rgba(255, 255, 255, 0.45) 0px 5px 15px"
            : "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
      >
        <h1 className='formTitle'>
          Speech
          <svg
            className='speechWaveIcon'
            version='1.0'
            xmlns='http://www.w3.org/2000/svg'
            width='50.000000pt'
            height='50.000000pt'
            viewBox='0 0 50.000000 50.000000'
            preserveAspectRatio='xMidYMid meet'
          >
            <g
              transform='translate(0.000000,50.000000) scale(0.100000,-0.100000)'
              fill={"red"}
              stroke='none'
            >
              <path
                d='M120 250 c0 -120 4 -190 10 -190 6 0 10 70 10 190 0 120 -4 190 -10
190 -6 0 -10 -70 -10 -190z'
              />
              <path
                d='M360 250 c0 -120 4 -190 10 -190 6 0 10 70 10 190 0 120 -4 190 -10
190 -6 0 -10 -70 -10 -190z'
              />
              <path
                d='M60 250 c0 -60 4 -100 10 -100 6 0 10 40 10 100 0 60 -4 100 -10 100
-6 0 -10 -40 -10 -100z'
              />
              <path
                d='M420 250 c0 -60 4 -100 10 -100 6 0 10 40 10 100 0 60 -4 100 -10
100 -6 0 -10 -40 -10 -100z'
              />
              <path
                d='M180 250 c0 -53 4 -90 10 -90 6 0 10 37 10 90 0 53 -4 90 -10 90 -6
0 -10 -37 -10 -90z'
              />
              <path
                d='M300 250 c0 -53 4 -90 10 -90 6 0 10 37 10 90 0 53 -4 90 -10 90 -6
0 -10 -37 -10 -90z'
              />
              <path
                d='M0 250 c0 -22 5 -40 10 -40 6 0 10 18 10 40 0 22 -4 40 -10 40 -5 0
-10 -18 -10 -40z'
              />
              <path
                d='M240 250 c0 -22 5 -40 10 -40 6 0 10 18 10 40 0 22 -4 40 -10 40 -5
0 -10 -18 -10 -40z'
              />
              <path
                d='M480 250 c0 -22 5 -40 10 -40 6 0 10 18 10 40 0 22 -4 40 -10 40 -5
0 -10 -18 -10 -40z'
              />
            </g>
          </svg>
          Notes
        </h1>
        <div className='form-group'>
          <label className='formLabel'>Email</label>
          <input
            className={`form-control ${isDarkDefault ? "dark" : ""} `}
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
            className={`form-control ${isDarkDefault ? "dark" : ""} `}
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
