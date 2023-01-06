import "../css/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import noteService from "../services/noteService";

const Note = ({ refresh, id, title, content, updatedAt, key }) => {
  // change date format
  const updated = updatedAt
    .replace(/T|Z/g, " ")
    .substr(0, updatedAt.length - 5);

  const MySwal = withReactContent(Swal);

  const navigate = useNavigate();

  const at = localStorage.getItem("at");

  let timerInterval;

  const [refreshFlag, setRefreshFlag] = refresh;

  const deleteDialog = async () => {
    await noteService.deleteNote(at, id);
    setRefreshFlag(!refreshFlag);
  };

  useEffect(() => {}, [refreshFlag]);

  return (
    <div>
      <div
        className='overflow-hidden break-words w-64 h-80 lg:w-80 lg:h-96 xl:w-96 xl:h-128 cursor-pointer overflow-y-hidden shadow appearance-none border rounded my-1 py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        onClick={() => navigate(`note/${id}`)}
        key={key}
      >
        <h2>{content}</h2>
      </div>
      <div>
        <h1 className='text-center font-taviraj text-xl dark:text-white'>
          {title}
        </h1>
        <FontAwesomeIcon
          onClick={() => {
            MySwal.fire({
              title: "Do you want to delete note?",
              icon: "question",
              showCancelButton: true,
              confirmButtonText: "Delete",
            }).then((result) => {
              if (result.isConfirmed) {
                setTimeout(() => deleteDialog(), 1000);

                MySwal.fire({
                  title: `Deleting ${title} note...`,
                  icon: "success",
                  timer: 1000,
                  didOpen: () => {
                    MySwal.showLoading(null);
                    timerInterval = setInterval(() => {}, 100);
                  },
                  willClose: () => clearInterval(timerInterval),
                });
              }
            });
          }}
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
