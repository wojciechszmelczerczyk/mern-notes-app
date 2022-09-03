import NoteService from "../services/noteService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateNoteComponent() {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  async function createNote(e) {
    e.preventDefault();
    const at = localStorage.getItem("at");
    const newNote = await NoteService.createNote(at, title);
    if (newNote) {
      const newNoteId = newNote["data"]["_id"];
      localStorage.setItem("note_id", newNoteId);
      console.log(localStorage.getItem("note_id"));
      navigate(`/note/${newNoteId}`);
    } else {
    }
  }

  function handleTitle(e) {
    setTitle(e.target.value);
  }
  return (
    <div className='create-note-container'>
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
          <div className='buttonContainer'>
            <button
              onClick={() => navigate("/")}
              className='btn btn-danger cancelCreateNoteButton'
            >
              Cancel
            </button>
            <button type='submit' className='btn btn-success createNoteButton'>
              Create note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}