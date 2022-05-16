const Form = (props) => {
  return (
    <>
      <form>
        <label>email:</label>
        <input
          type='email'
          name='email'
          placeholder='email'
          value={props.email}
          onChange={props.handleEmail}
        ></input>
        <label>password:</label>
        <input
          type='password'
          name='password'
          placeholder='password'
          value={props.password}
          onChange={props.handlePassword}
        ></input>
      </form>
      <button onClick={props.userOp}>Submit</button>
    </>
  );
};

export default Form;
