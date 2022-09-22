import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import speech from "../svg/speech.svg";

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
    <div className='flex flex-row min-h-screen justify-center items-center'>
      <div className='grid w-80 h-96 lg:w-96 lg:h-96 shadow rounded-lg'>
        <div className='flex justify-center py-8 items-center'>
          <h1 className='text-sm md:text-xl font-taviraj font-medium'>
            Speech
          </h1>
          <img className='w-10 h-15' src={speech} alt='' />
          <h1 className='text-sm md:text-xl font-taviraj font-medium'>Notes</h1>
        </div>
        <form className='grid grid-rows-4  px-2'>
          <div>
            <label>Email</label>
            <input
              className='shadow appearance-none border rounded w-full my-1 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              type='email'
              data-cy='emailInput'
              name='email'
              placeholder='email'
              value={email}
              onChange={handleEmail}
            ></input>
            <div data-cy='emailError'>
              {emailError ? emailError.match("Please enter a valid email") : ""}
            </div>
          </div>
          <div>
            <label>Password</label>
            <input
              className='shadow appearance-none border rounded w-full my-1 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              type='password'
              data-cy='passwordInput'
              name='password'
              placeholder='password'
              value={password}
              onChange={handlePassword}
            ></input>
            <div data-cy='passwordError'>
              {passwordError
                ? passwordError.match("Password is too short")
                : ""}
            </div>
          </div>
          {accountExist ? (
            <NavLink className='formLink py-3' to='/register'>
              Don't have account? Sign Up!
            </NavLink>
          ) : (
            <NavLink className='formLink py-3' to='/login'>
              Already have an account? Login!
            </NavLink>
          )}
          <div className='flex justify-center items-center'>
            <button
              className='w-24 h-10 bg-blue-700 text-white rounded-lg'
              data-cy='userBtn'
              onClick={userOp}
            >
              {name}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
