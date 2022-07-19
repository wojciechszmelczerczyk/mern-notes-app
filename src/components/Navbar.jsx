import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <NavLink to='/createNote'>Create note</NavLink>
      {/* <NavLink to='/login'>Login</NavLink>
      <NavLink to='/register'>Sign up</NavLink>
      <NavLink to='/logout'>Logout</NavLink> */}
    </div>
  );
};

export default Navbar;
