import { useState, useEffect } from "react";
import noteService from "../services/noteService";
import Note from "../components/Note";
import { Navigate } from "react-router-dom";

export default function NoteListComponent() {
  const [notes, setNotes] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const at = localStorage.getItem("at");
    // const rt = localStorage.getItem("rt");

    noteService
      .getNotes(at)
      .then((res) => {
        setNotes(res.data);
      })
      .catch((err) => {
        setIsLoggedIn(false);
      });
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <>
          <h1 className='noteListTitle'>Note list</h1>

          <div className='container noteList'>
            <div className='row justify-content-between'>
              {notes.map((note) => (
                <div className='col' key={note._id}>
                  <Note title={note.title} content={note.content} />
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <Navigate to='/login' />
      )}
    </div>
  );
}
