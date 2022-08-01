import "../custom.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import noteService from "../services/noteService";

const Note = ({ id, title, content, updatedAt, key }) => {
  // change date format
  let updated = updatedAt.replace(/T|Z/g, " ").substr(0, updatedAt.length - 5);
  let navigate = useNavigate();
  let at = localStorage.getItem("at");

  const deleteNote = async function (id) {
    await noteService.deleteNote(at, id);
  };
  return (
    <>
      <div
        onClick={() => navigate(`note/${id}`)}
        style={{ cursor: "pointer" }}
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
