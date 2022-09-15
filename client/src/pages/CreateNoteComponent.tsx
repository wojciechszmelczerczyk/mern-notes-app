import NoteService from "../services/noteService";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarContext } from "../context/SidebarContext";

export default function CreateNoteComponent() {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [isSidebarActive, setIsSidebarActive] = useContext(SidebarContext);

  async function createNote(e) {
    e.preventDefault();
    const at = localStorage.getItem("at");
    const newNote = await NoteService.createNote(at, title);

    if (!newNote.data.err) {
      const newNoteId = newNote["data"]["_id"];
      localStorage.setItem("note_id", newNoteId);
      setIsSidebarActive(false);
      navigate(`/note/${newNoteId}`);
    } else if (newNote.data.err) {
      setError(newNote.data.err);
    }
  }

  function handleTitle(e) {
    setError("");
    setTitle(e.target.value);
  }
  return (
    <div className='create-note-container'>
      <div className='createFormContainer'>
        <label className='createNoteLabel'>Note title: </label>
        <input
          className='noteTitleInput'
          data-cy='noteTitleInput'
          name='title'
          placeholder='title'
          value={error ? "" : title}
          onChange={handleTitle}
        ></input>
        <button
          onClick={() => {
            setIsSidebarActive(false);
            navigate("/");
          }}
          className='btn btn-danger cancelCreateNoteButton'
        >
          Cancel
        </button>
        <button
          onClick={createNote}
          className='btn btn-success createNoteButton'
          data-cy='createNoteButton'
        >
          Create note
        </button>
      </div>
      <div
        className='createNoteError'
        data-cy='createNoteError'
        style={{ color: "red" }}
      >
        {error ? error : ""}
      </div>
    </div>
  );
}
