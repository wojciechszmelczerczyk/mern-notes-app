import NoteService from "../services/noteService";
import { useState } from "react";
export default function CreateNoteComponent() {
  const [title, setTitle] = useState("");

  async function createNote() {
    const newNote = await NoteService.createNote(title);

    const newNoteId = newNote["data"]["_id"];

    localStorage.setItem("note_id", newNoteId);
  }

  function handleTitle(e) {
    setTitle(e.target.value);
  }

  return (
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
  );
}
