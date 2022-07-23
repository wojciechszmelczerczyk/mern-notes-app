import { useState, useEffect } from "react";
import noteService from "../services/noteService";
import Note from "../components/Note";
import { Navigate } from "react-router-dom";

export default function NoteListComponent() {
  const [notes, setNotes] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const at = localStorage.getItem("at");

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
          <h1 className='noteListTitle'>Speech Notes</h1>

          {notes.length === 0 ? (
            <div className='emptyNoteListInfo'>No notes add some!✍️</div>
          ) : (
            <div className='container noteList'>
              <div className='row justify-content-start'>
                {notes.map((note) => (
                  <div className='col-sm-12 col-md-6 col-lg-4' key={note._id}>
                    <Note
                      title={note.title}
                      content={note.content}
                      updatedAt={note.updatedAt}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <Navigate to='/login' />
      )}
    </div>
  );
}
