import UserService from "../services/userService";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

import { useContext, useEffect, useState } from "react";
import DarkTheme from "react-dark-theme";
import { lightTheme, darkTheme } from "../data/themes";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useContext(AuthContext);
  const [isDarkDefault, setIsDarkDefault] = useContext(ThemeContext);

  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    function handleResize() {
      setHeight(window.innerHeight);
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [height, width]);

  // logout function
  const logout = async function () {
    let at = localStorage.getItem("at");
    await UserService.logout(at);
    localStorage.removeItem("at");
    localStorage.removeItem("rt");
    setIsLoggedIn(false);
  };

  const toggleTheme = () => setIsDarkDefault(!isDarkDefault);

  return (
    <div>
      <div className='d-flex flex-row-reverse'>
        <NavLink onClick={logout} to='/login'>
          <FontAwesomeIcon
            className='logoutIcon'
            icon={faAngleRight}
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
      <div onClick={toggleTheme} className='themeTogglerContainer'>
        <DarkTheme
          className='themeToggler'
          defaultDark={isDarkDefault}
          light={lightTheme}
          dark={darkTheme}
        />
      </div>
    </div>
  );
};

export default Navbar;
