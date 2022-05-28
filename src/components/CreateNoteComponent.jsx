import NoteService from "../services/noteService";
import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function CreateNoteComponent() {
  const [title, setTitle] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function createNote() {
    const newNote = await NoteService.createNote(title);

    if (newNote) {
      const newNoteId = newNote["data"]["_id"];
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
        <>
          <form>
            <label>Note title: </label>
            <input
              name='title'
              placeholder='title'
              value={title}
              onChange={handleTitle}
            ></input>
          </form>
          <button onClick={createNote}>Create note</button>
        </>
      ) : (
        <Navigate to='/saveNote' />
      )}
    </div>
  );
}
