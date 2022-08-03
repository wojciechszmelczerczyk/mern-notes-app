import "../custom.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import noteService from "../services/noteService";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Note = ({ refresh, id, title, content, updatedAt, key }) => {
  // change date format
  const updated = updatedAt
    .replace(/T|Z/g, " ")
    .substr(0, updatedAt.length - 5);

  const navigate = useNavigate();

  const at = localStorage.getItem("at");

  const [refreshFlag, setRefreshFlag] = refresh;

  const [isDarkDefault] = useContext(ThemeContext);

  const deleteNote = async function (id) {
    await noteService.deleteNote(at, id);
    setRefreshFlag(!refreshFlag);
  };
  return (
    <>
      <div
        onClick={() => navigate(`note/${id}`)}
        style={{
          cursor: "pointer",
          boxShadow: isDarkDefault
            ? "rgba(255, 255, 255, 0.45) 0px 5px 15px"
            : "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
        className='note'
        key={key}
      >
        <h2 className='noteContent'>{content}</h2>
      </div>
      <div>
        <h1 className='noteTitle'>{title}</h1>
        <FontAwesomeIcon
          onClick={() => deleteNote(id)}
          style={{ cursor: "pointer" }}
          className='deleteNoteIcon'
          icon={faTrash}
          color='red'
          size='1x'
        />
      </div>
      <h2 className='dou'>{updated}</h2>
    </>
  );
};

export default Note;
