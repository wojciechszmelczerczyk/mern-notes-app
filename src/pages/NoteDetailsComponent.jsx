import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NoteService from "../services/noteService";

export default function NoteDetailsComponent() {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

  let { id } = useParams();
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
    console.log(noteContent);
  }

  async function updateNote() {
    return await NoteService.updateNote(at, id, noteContent);
  }

  return (
    <>
      <h1>{noteTitle}</h1>
      <textarea value={noteContent} onChange={updateNoteContent} />
      <button onClick={updateNote}>Save</button>
    </>
  );
}
