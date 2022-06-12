import { useState, useEffect } from "react";
import noteService from "../services/noteService";
import Note from "../components/Note";
import { Navigate } from "react-router-dom";

export default function NoteListComponent() {
  const [notes, setNotes] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    noteService
      .getNotes()
      .then((res) => {
        if (res.status === 200) {
          setNotes(res.data);
        }
      })
      .catch((err) => {
        setIsLoggedIn(false);
      });
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <>
          <h1>Note list</h1>
          <div>
            {notes.map((note) => (
              <Note title={note.title} content={note.content} key={note._id} />
            ))}
          </div>
        </>
      ) : (
        <Navigate to='/login' />
      )}
    </div>
  );
}
