const Form = ({ email, password, handleEmail, handlePassword, userOp }) => {
  return (
    <>
      <form>
        <label>email:</label>
        <input
          type='email'
          name='email'
          placeholder='email'
          value={email}
          onChange={handleEmail}
        ></input>
        <label>password:</label>
        <input
          type='password'
          name='password'
          placeholder='password'
          value={password}
          onChange={handlePassword}
        ></input>
      </form>
      <button onClick={userOp}>Submit</button>
    </>
  );
};

export default Form;
