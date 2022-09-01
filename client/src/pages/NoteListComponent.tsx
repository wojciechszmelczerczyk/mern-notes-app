import { useState, useEffect } from "react";
import noteService from "../services/noteService";
import Note from "../components/Note";
import { Navigate } from "react-router-dom";
import Search from "../components/Search";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortAlphaAsc,
  faSortAlphaDesc,
} from "@fortawesome/free-solid-svg-icons";
import { SortContext } from "../context/SortContext";

export default function NoteListComponent() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const focus = [isFocus, setIsFocus];
  const [isLoggedIn] = useContext(AuthContext);
  const [isSort, setIsSort] = useContext(SortContext);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const refresh = [refreshFlag, setRefreshFlag];

  useEffect(() => {
    const at = localStorage.getItem("at");

    noteService
      .getNotes(at, isSort)
      .then((res) => {
        setNotes(res.data);
        setFilteredNotes(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [refreshFlag, isSort]);

  const handleUserInput = function (search) {
    const filteredNoteArray = notes.filter((note) =>
      note.title.includes(search)
    );
    setFilteredNotes(filteredNoteArray);
    if (search.length === 0) setFilteredNotes(notes);
  };

  const handleSort = function () {
    setIsSort(!isSort);
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
            <>
              <Search focus={focus} handleUserInput={handleUserInput} />
              <FontAwesomeIcon
                onClick={handleSort}
                icon={isSort ? faSortAlphaAsc : faSortAlphaDesc}
              />
            </>
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
                  {filteredNotes?.map(({ _id, title, content, updatedAt }) => (
                    <div className='col-sm-12 col-md-6 col-lg-4'>
                      <Note
                        key={_id}
                        refresh={refresh}
                        id={_id}
                        title={title}
                        content={content}
                        updatedAt={updatedAt}
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
