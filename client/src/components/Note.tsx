import "../css/custom.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import Dialog from "./Dialog";
import { SearchContext } from "../context/SearchContext";

const Note = ({ refresh, id, title, content, updatedAt, key }) => {
  // change date format
  const updated = updatedAt
    .replace(/T|Z/g, " ")
    .substr(0, updatedAt.length - 5);

  const navigate = useNavigate();

  const [refreshFlag, setRefreshFlag] = refresh;

  const [dialog, setDialog] = useState(false);

  const [isDarkDefault] = useContext(ThemeContext);
  const [isSearchActive] = useContext(SearchContext);

  const deleteNote = async function (id) {
    setDialog(true);
  };
  return (
    <>
      {isSearchActive ? (
        <div
          onClick={() => navigate(`note/${id}`)}
          style={{
            height: "30px",
            marginTop: "0",
            cursor: "pointer",
            borderRadius: "0",
            // flex: "0 0",
            boxShadow: isSearchActive
              ? "none"
              : isDarkDefault
              ? "rgba(255, 255, 255, 0.45) 0px 5px 15px"
              : "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
          className='note'
          key={key}
        >
          <h1
            className='noteTitle'
            style={{ textAlign: "start", marginLeft: "10px", fontSize: "20px" }}
          >
            {title}
          </h1>
        </div>
      ) : (
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
            <Dialog
              show={dialog}
              setShow={setDialog}
              id={id}
              refreshFlag={refreshFlag}
              setRefreshFlag={setRefreshFlag}
            />
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
      )}
    </>
  );
};

export default Note;
