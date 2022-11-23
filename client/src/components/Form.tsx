import { NavLink } from "react-router-dom";
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
  return (
    <div className='flex flex-row min-h-screen justify-center items-center shadow-lg shadow-black bg-white dark:bg-black dark:shadow-white '>
      <div className='grid lg:w-128 lg:h-144 shadow rounded-lg'>
        <div className='flex justify-center py-8 items-center'>
          <h1 className='text-md md:text-xl lg:text-2xl font-taviraj font-medium text-black dark:text-white'>
            Speech
          </h1>
          <img className='w-10 h-15' src={speech} alt='' />
          <h1 className='text-md md:text-xl lg:text-2xl font-taviraj font-medium text-black dark:text-white'>
            Notes
          </h1>
        </div>
        <form className='grid grid-rows-4 px-2'>
          <div>
            <label className='text-blackdark:text-white'>Email</label>
            <input
              className='shadow appearance-none border rounded w-full my-1 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              type='email'
              data-cy='emailInput'
              name='email'
              placeholder='email'
              value={email}
              onChange={handleEmail}
            ></input>
            <div className='text-red-500' data-cy='emailError'>
              {emailError ? emailError : ""}
            </div>
          </div>
          <div>
            <label className='text-black dark:text-white'>Password</label>
            <input
              className='shadow appearance-none border rounded w-full my-1 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              type='password'
              data-cy='passwordInput'
              name='password'
              placeholder='password'
              value={password}
              onChange={handlePassword}
            ></input>
            <div className='text-red-500' data-cy='passwordError'>
              {passwordError ? passwordError : ""}
            </div>
          </div>
          {accountExist ? (
            <NavLink
              className='py-3  text-blue-500 dark:text-blue-500'
              to='/register'
            >
              Don't have account? Sign Up!
            </NavLink>
          ) : (
            <NavLink
              className='py-3 text-blue-500 dark:text-blue-500'
              to='/login'
            >
              Already have an account? Login!
            </NavLink>
          )}
          <div className='flex justify-center items-center'>
            <button
              className='h-10 w-48 lg:w-64 bg-blue-700 text-white rounded-lg'
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
