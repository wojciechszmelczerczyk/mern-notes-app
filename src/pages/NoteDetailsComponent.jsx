import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NoteService from "../services/noteService";

export default function NoteDetailsComponent() {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

  let { id } = useParams();
  let navigate = useNavigate();
  let at = localStorage.getItem("at");

  useEffect(() => {
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

  async function downloadNote() {
    await NoteService.downloadNote(at, id);
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
      <button className='updateNoteBtn' onClick={updateNote}>
        Save
      </button>
      <button className='downloadNoteBtn' onClick={downloadNote}>
        Download PDF
      </button>
    </>
  );
}
