import { useState, useEffect } from "react";
import noteService from "../services/noteService";
import Note from "../components/Note";
import { Navigate } from "react-router-dom";
import Search from "../components/Search";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export default function NoteListComponent() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const focus = [isFocus, setIsFocus];

  const [isLoggedIn] = useContext(AuthContext);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const refresh = [refreshFlag, setRefreshFlag];

  useEffect(() => {
    const at = localStorage.getItem("at");

    noteService
      .getNotes(at)
      .then((res) => {
        setNotes(res.data);
        setFilteredNotes(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [refreshFlag]);

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
          <Navbar />
          <h1 className='noteListTitle'>Speech Notes</h1>
          {filteredNotes?.length === 0 && !isFocus ? (
            ""
          ) : (
            <Search focus={focus} handleUserInput={handleUserInput} />
          )}

          {filteredNotes?.length === 0 ? (
            <>
              {!isFocus ? (
                <div className='emptyNoteListInfo'>No notes add some!✍️</div>
              ) : (
                <div className='emptyNoteListInfo'>Note not found❌</div>
              )}
            </>
          ) : (
            <>
              <div className='container noteList'>
                <div className='row justify-content-start'>
                  {filteredNotes?.map((note) => (
                    <div className='col-sm-12 col-md-6 col-lg-4' key={note._id}>
                      <Note
                        refresh={refresh}
                        id={note._id}
                        title={note.title}
                        content={note.content}
                        updatedAt={note.updatedAt}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <Navigate to='/login' />
      )}
    </div>
  );
}
