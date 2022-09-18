import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { SidebarContext } from "../../context/SidebarContext";
import { ThemeContext } from "../../context/ThemeContext";
import userService from "../../services/userService";

const Sidebar = () => {
  const [isLoggedIn, setIsLoggedIn] = useContext(AuthContext);
  const [isDarkDefault, setIsDarkDefault] = useContext(ThemeContext);
  const [isSidebarVisible, setIsSidebarVisible] = useContext(SidebarContext);

  // logout function
  const logout = async function () {
    let at = localStorage.getItem("at");
    await userService.logout(at);
    localStorage.removeItem("at");
    localStorage.removeItem("rt");
    setIsSidebarVisible(!isSidebarVisible);
    setIsLoggedIn(false);
  };

  return (
    <div
      className='sidebarContainer'
      style={{
        position: "absolute",
        display: "flex",
        flexDirection: "row-reverse",
        height: "100%",
        width: "100%",
        bottom: "0",
        right: "0",
        zIndex: "2",
        backgroundColor: isDarkDefault ? "white" : "black",
      }}
    >
      <div
        style={{
          margin: "5px 10px 0 0",
          fontSize: 30,
          color: isDarkDefault ? "black" : "white",
        }}
        onClick={() => setIsSidebarVisible(!isSidebarVisible)}
      >
        X
      </div>
      <div
        className='sidebar'
        style={
          isSidebarVisible
            ? {
                position: "absolute",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "90%",
                width: "100%",
                bottom: "0",
                right: "0",
                zIndex: "2",
                backgroundColor: isDarkDefault ? "white" : "black",
              }
            : {}
        }
      >
        <NavLink to='/createNote'>Create Note</NavLink>
        <NavLink onClick={logout} to='/login'>
          Logout
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
