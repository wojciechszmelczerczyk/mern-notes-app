import UserService from "../services/userService";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faAngleRight,
  faBars,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { SearchContext } from "../context/SearchContext";
import { SidebarContext } from "../context/SidebarContext";

import { useContext, useEffect, useState } from "react";
import DarkTheme from "react-dark-theme";
import { lightTheme, darkTheme } from "../data/themes";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useContext(AuthContext);
  const [isDarkDefault, setIsDarkDefault] = useContext(ThemeContext);
  const [isSidebarActive, setIsSidebarActive] = useContext(SidebarContext);
  const [isSearchActive, setIsSearchActive] = useContext(SearchContext);

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

  const toggleSidebar = () => setIsSidebarActive(!isSidebarActive);

  const toggleSearch = () => setIsSearchActive(!isSearchActive);

  const toggleTheme = () => setIsDarkDefault(!isDarkDefault);

  return (
    <div>
      {width < 1000 ? (
        <div className='d-flex flex-row-reverse'>
          <div onClick={toggleSidebar}>
            <FontAwesomeIcon
              className='logoutIcon'
              cursor={"pointer"}
              icon={faBars}
              color={isDarkDefault ? "white" : "black"}
              size='2x'
            />
          </div>
          <div>
            {(width < 1000 && height < 800 && width < height) ||
            (width < 1000 && height < 800 && width > height) ? (
              <div onClick={toggleSearch}>
                <FontAwesomeIcon
                  className='fa-search'
                  cursor={"pointer"}
                  icon={faSearch}
                />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
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
      )}
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
