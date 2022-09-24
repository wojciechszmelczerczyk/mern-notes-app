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
    <div className='flex flex-row min-h-screen justify-center items-center'>
      <div>
        <label className='lg:text-2xl'>Note title: </label>
        <input
          className='px-1 border rounded-lg lg:h-10'
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
          className='bg-red-600 px-2 py-2 rounded-lg text-white'
        >
          Cancel
        </button>
        <button
          onClick={createNote}
          className='bg-green-600 px-2 py-2 rounded-lg text-white'
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
