import NoteService from "../services/noteService";
import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";

export default function CreateNoteComponent() {
  const [title, setTitle] = useState("");
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  async function createNote(e) {
    e.preventDefault();
    const at = localStorage.getItem("at");
    const newNote = await NoteService.createNote(at, title);
    if (newNote) {
      const newNoteId = newNote["data"]["_id"];
      console.log(newNoteId);
      localStorage.setItem("note_id", newNoteId);
      setRedirect(true);
    } else {
      // some handler
    }
  }

  function handleTitle(e) {
    setTitle(e.target.value);
  }
  return (
    <div className='create-note-container'>
      {!redirect ? (
        <div className='createFormContainer'>
          <form onSubmit={createNote}>
            <label className='createNoteLabel'>Note title: </label>
            <input
              className='noteTitleInput'
              name='title'
              placeholder='title'
              value={title}
              onChange={handleTitle}
            ></input>
            <button
              onClick={() => navigate("/")}
              className='btn btn-danger cancelCreateNoteButton'
            >
              Cancel
            </button>
            <button type='submit' className='btn btn-success createNoteButton'>
              Create note
            </button>
          </form>
        </div>
      ) : (
        <Navigate to='/saveNote' />
      )}
    </div>
  );
}
