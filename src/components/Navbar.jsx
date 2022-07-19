import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNotesMedical } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <div className='d-flex flex-row-reverse'>
      <NavLink to='/createNote'>
        <FontAwesomeIcon icon={faNotesMedical} color='black' size='xl' />
      </NavLink>
    </div>
  );
};

export default Navbar;
