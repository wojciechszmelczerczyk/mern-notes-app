import UserService from "../services/userService";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faAngleRight,
  faBars,
  faSortAlphaAsc,
  faSortAlphaDesc,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import sun from "../svg/icons8-sun.svg";
import moon from "../svg/moon-phases-svgrepo-com.svg";

import { AuthContext } from "../context/AuthContext";
import { SidebarContext } from "../context/SidebarContext";

import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";

const Navbar = ({ order, handleSort, isDark, setIsDark }) => {
  const [isLoggedIn, setIsLoggedIn] = useContext(AuthContext);
  const [isSidebarActive, setIsSidebarActive] = useContext(SidebarContext);
  const [isSearchActive, setIsSearchActive] = useContext(SearchContext);

  // logout function
  const logout = async function () {
    let at = localStorage.getItem("at");
    await UserService.logout(at);
    localStorage.removeItem("at");
    localStorage.removeItem("rt");
    setIsLoggedIn(false);
  };

  const toggleSidebar = () => setIsSidebarActive(!isSidebarActive);

  const toggleTheme = () => {
    document.querySelector("html").classList.toggle("dark");
    setIsDark(!isDark);
  };

  const toggleSearchbar = () => {
    setIsSearchActive(!isSearchActive);
  };

  return (
    <div className='flex justify-end h-24 xl:h-32'>
      <div onClick={toggleTheme}>
        <img
          className='absolute top-0 left-0 w-10 h-8 dark:my-2'
          src={
            document.querySelector("html").classList.contains("dark")
              ? moon
              : sun
          }
          alt=''
        />
      </div>
      <div onClick={toggleSearchbar}>
        <FontAwesomeIcon
          className='block md:hidden mx-1 my-2 cursor-pointer dark:text-white'
          icon={faSearch}
        />
      </div>
      <div>
        <FontAwesomeIcon
          className='block md:hidden mx-1 my-2 cursor-pointer dark:text-white'
          icon={order === "asc" ? faSortAlphaAsc : faSortAlphaDesc}
          onClick={handleSort}
        />
      </div>
      <div onClick={toggleSidebar}>
        <FontAwesomeIcon
          className='inline-block md:hidden mx-1 my-1 cursor-pointer dark:text-white'
          icon={faBars}
          color='black'
          size='2x'
        />
      </div>
      <NavLink to='/createNote'>
        <FontAwesomeIcon
          className='hidden md:inline-block mx-1 my-1 cursor-pointer dark:text-white'
          icon={faPlus}
          color='black'
          size='2x'
        />
      </NavLink>
      <NavLink onClick={logout} to='/login'>
        <FontAwesomeIcon
          className='hidden md:inline-block mx-1 my-1 dark:text-white'
          icon={faAngleRight}
          color={"black"}
          size='2x'
        />
      </NavLink>
    </div>
  );
};

export default Navbar;
