import UserService from "../services/userService.js";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useContext(AuthContext);
  // logout function
  const logout = async function () {
    let at = localStorage.getItem("at");
    await UserService.logout(at);
    localStorage.removeItem("at");
    localStorage.removeItem("rt");
    setIsLoggedIn(false);
  };

  return (
    <>
      <div className='d-flex flex-row-reverse'>
        <NavLink onClick={logout} to='/login'>
          <FontAwesomeIcon
            className='logoutIcon'
            icon={faArrowRightFromBracket}
            color='black'
            size='2x'
          />
        </NavLink>
        <NavLink to='/createNote'>
          <FontAwesomeIcon
            className='createNoteIcon'
            icon={faPlus}
            color='black'
            size='2x'
          />
        </NavLink>
      </div>
    </>
  );
};

export default Navbar;
