/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NoteService from "../services/noteService";
import download from "js-file-download";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export default function NoteDetailsComponent() {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [isLoggedIn] = useContext(AuthContext);

  console.log(isLoggedIn);

  let { id } = useParams();
  let navigate = useNavigate();
  let at = localStorage.getItem("at");

  useEffect(() => {
    // check global state of app if auth if not redirect to login
    if (!isLoggedIn) navigate("/login");

    NoteService.getSingleNote(at, id)
      .then((res) => {
        setNoteTitle(res.data["title"]);
        setNoteContent(res.data["content"]);
      })
      .catch((err) => console.log(err));
  }, []);

  function updateNoteContent(e) {
    setNoteContent(e.target.value);
  }

  async function updateNote() {
    await NoteService.updateNote(at, id, noteContent);
    navigate("/");
  }

  async function downloadNote(format) {
    const res = await NoteService.downloadNote(at, id, format);
    if (res.headers["content-type"] === "application/pdf") {
      download(res.data, "note.pdf");
    } else {
      download(res.data, "note.txt");
    }
    navigate("/");
  }

  return (
    <>
      <h1 className='singleNoteTitle'>{noteTitle}</h1>
      <textarea
        className='singleNoteContent'
        value={noteContent}
        onChange={updateNoteContent}
      />
      <button
        className='btn btn-danger cancelNoteBtn'
        onClick={() => navigate("/")}
      >
        Cancel
      </button>
      <button className='btn btn-success updateNoteBtn' onClick={updateNote}>
        Save
      </button>
      <div className='dropdown'>
        <button
          className='btn btn-primary dropdown-toggle'
          type='button'
          id='dropdownMenuButton'
          data-bs-toggle='dropdown'
          aria-expanded='false'
        >
          Download
        </button>
        <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
          <li>
            <a
              className='dropdown-item'
              onClick={(e) => downloadNote(e.currentTarget.innerText)}
            >
              pdf
            </a>
          </li>
          <li>
            <a
              className='dropdown-item'
              onClick={(e) => downloadNote(e.currentTarget.innerText)}
            >
              txt
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
