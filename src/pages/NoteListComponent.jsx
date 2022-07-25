import { useState, useEffect } from "react";
import noteService from "../services/noteService";
import Note from "../components/Note";
import { Navigate, useNavigate } from "react-router-dom";
import Search from "../components/Search";

export default function NoteListComponent() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const at = localStorage.getItem("at");

    noteService
      .getNotes(at)
      .then((res) => {
        setNotes(res.data);
        setFilteredNotes(res.data);
      })
      .catch((err) => {
        setIsLoggedIn(false);
      });
  }, []);

  const handleUserInput = function (search) {
    const filteredNoteArray = notes.filter((note) =>
      note.title.includes(search)
    );
    setFilteredNotes(filteredNoteArray);
    if (search.length === 0) setFilteredNotes(notes);
  };

  return (
    <div>
      {isLoggedIn ? (
        <>
          <h1 className='noteListTitle'>Speech Notes</h1>
          <Search handleUserInput={handleUserInput} />
          {filteredNotes.length === 0 ? (
            <div className='emptyNoteListInfo'>No notes add some!✍️</div>
          ) : (
            <div className='container noteList'>
              <div className='row justify-content-start'>
                {filteredNotes.map((note) => (
                  <div
                    className='col-sm-12 col-md-6 col-lg-4'
                    key={note._id}
                    onClick={() => navigate(`note/${note._id}`)}
                    style={{ cursor: "pointer" }}
                  >
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
