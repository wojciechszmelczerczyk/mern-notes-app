import "../css/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import Dialog from "./Dialog";

const Note = ({ refresh, id, title, content, updatedAt, key }) => {
  // change date format
  const updated = updatedAt
    .replace(/T|Z/g, " ")
    .substr(0, updatedAt.length - 5);

  const navigate = useNavigate();

  const [refreshFlag, setRefreshFlag] = refresh;

  const [dialog, setDialog] = useState(false);

  const deleteNote = async function (id) {
    setDialog(true);
  };
  return (
    <div>
      <div
        className='w-64 h-80 lg:w-80 lg:h-96 xl:w-96 xl:h-128 cursor-pointer overflow-y-hidden shadow appearance-none border rounded my-1 py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        onClick={() => navigate(`note/${id}`)}
        key={key}
      >
        <h2>{content}</h2>
      </div>
      <div>
        <h1 className='text-center font-taviraj text-xl dark:text-white'>
          {title}
        </h1>
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
          icon={faTrash}
          color='red'
          size='1x'
        />
      </div>
      <h2 className='text-center font-taviraj dark:text-white'>{updated}</h2>
    </div>
  );
};

export default Note;
