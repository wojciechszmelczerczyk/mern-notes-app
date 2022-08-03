import UserService from "../services/userService.js";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

import { useContext } from "react";
import DarkTheme from "react-dark-theme";
import { lightTheme, darkTheme } from "../data/themes.js";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useContext(AuthContext);
  const [isDarkDefault, setIsDarkDefault] = useContext(ThemeContext);

  // logout function
  const logout = async function () {
    let at = localStorage.getItem("at");
    await UserService.logout(at);
    localStorage.removeItem("at");
    localStorage.removeItem("rt");
    setIsLoggedIn(false);
  };

  const toggleTheme = () => {
    setIsDarkDefault(!isDarkDefault);
  };

  return (
    <>
      <div onClick={toggleTheme} className='themeTogglerContainer'>
        <DarkTheme
          className='themeToggler'
          defaultDark={isDarkDefault}
          light={lightTheme}
          dark={darkTheme}
        />
      </div>

      <div className='d-flex flex-row-reverse'>
        <NavLink onClick={logout} to='/login'>
          <FontAwesomeIcon
            className='logoutIcon'
            icon={faRightFromBracket}
            color={isDarkDefault ? "white" : "black"}
            size='2x'
          />
        </NavLink>
        <NavLink to='/createNote'>
          <FontAwesomeIcon
            className='createNoteIcon'
            icon={faPlus}
            color={isDarkDefault ? "white" : "black"}
            size='2x'
          />
        </NavLink>
      </div>
    </>
  );
};

export default Navbar;
