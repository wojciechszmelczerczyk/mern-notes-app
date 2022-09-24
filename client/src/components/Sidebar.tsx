import { useContext } from "react";
import { SidebarContext } from "../context/SidebarContext";
import { NavLink } from "react-router-dom";
import UserService from "../services/userService";
import { AuthContext } from "../context/AuthContext";

const Sidebar = () => {
  const [isSidebarActive, setIsSidebarActive] = useContext(SidebarContext);
  const [isLoggedIn, setIsLoggedIn] = useContext(AuthContext);

  // logout function
  const logout = async function () {
    let at = localStorage.getItem("at");
    await UserService.logout(at);
    localStorage.removeItem("at");
    localStorage.removeItem("rt");
    setIsSidebarActive(false);
    setIsLoggedIn(false);
  };

  return (
    <div className='grid flex-col min-h-screen min-w-screen bg-white dark:bg-black'>
      <div
        onClick={() => setIsSidebarActive(false)}
        className='justify-self-end mx-2 my-1'
      >
        <p className='cursor-pointer'>X</p>
      </div>
      <NavLink
        className='justify-self-center text-black dark:text-white'
        to='/createNote'
      >
        Create note
      </NavLink>
      <NavLink
        className='justify-self-center text-black dark:text-white'
        onClick={logout}
        to='/login'
      >
        Logout
      </NavLink>
    </div>
  );
};

export default Sidebar;
