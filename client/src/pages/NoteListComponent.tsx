import { useState, useEffect } from "react";
import noteService from "../services/noteService";
import Note from "../components/Note";
import { Navigate } from "react-router-dom";
import Search from "../components/Search";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Searchbar from "../components/Searchbar";
import { AuthContext, SidebarContext, SearchContext } from "../context";

import { useContext } from "react";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortAlphaAsc,
  faSortAlphaDesc,
} from "@fortawesome/free-solid-svg-icons";
import speech from "../svg/speech.svg";

export default function NoteListComponent() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const focus = [isFocus, setIsFocus];
  const [isLoggedIn] = useContext(AuthContext);
  const [isSidebarActive] = useContext(SidebarContext);
  const [isSearchActive] = useContext(SearchContext);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const refresh = [refreshFlag, setRefreshFlag];
  const [order, setOrder] = useState("desc") as any;

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
      note.title.includes(search.toLowerCase())
    );
    setFilteredNotes(filteredNoteArray);
    if (search.length === 0) {
      setFilteredNotes(notes);
    }
  };

  const handleSort = function () {
    if (order === "asc") {
      setOrder("desc");
    } else {
      setOrder("asc");
    }

    const updatedNotes = _.forEach(filteredNotes, function (note) {
      return _.set(note, "updatedAt", Date.parse(note.updatedAt));
    });

    const orderedNotes = _.orderBy(updatedNotes, "updatedAt", order);

    const notes = _.forEach(orderedNotes, function (note) {
      return _.set(note, "updatedAt", new Date(note.updatedAt).toISOString());
    });

    setFilteredNotes(notes);
  };

  return (
    <div className='h-screen dark:bg-black transition ease-in-out duration-200'>
      {isSidebarActive ? <Sidebar /> : ""}
      {isSearchActive ? <Searchbar notes={notes} /> : ""}
      <div
        className={`${
          isSidebarActive | isSearchActive
            ? "invisible"
            : "visible flex flex-col"
        }`}
      >
        {isLoggedIn ? (
          <>
            <Navbar order={order} handleSort={handleSort} />
            <div className='flex lg:py-6 justify-center items-center'>
              <h1 className='text-lg md:text-xl lg:text-2xl font-taviraj font-medium dark:text-white'>
                Speech
              </h1>
              <img className='w-10 h-15' src={speech} alt='' />
              <h1 className='text-lg md:text-xl lg:text-2xl font-taviraj font-medium dark:text-white'>
                Notes
              </h1>
            </div>
            {notes?.length === 0 ? (
              <div className='text-center min-h-screen dark:bg-black dark:text-white'>
                No notes add some!✍️
              </div>
            ) : (
              <div className='flex flex-row-reverse h-64 items-end mx-20 my-2 2xl:items-center 2xl:mx-36'>
                <Search focus={focus} handleUserInput={handleUserInput} />
                <FontAwesomeIcon
                  className='hidden mx-3 dark:text-white md:block md:my-2'
                  style={{ cursor: "pointer" }}
                  onClick={handleSort}
                  icon={order === "asc" ? faSortAlphaAsc : faSortAlphaDesc}
                />
              </div>
            )}

            {filteredNotes?.length === 0 && isFocus ? (
              <>
                <div className='min-h-screen text-center dark:bg-black dark:text-white'>
                  Note not found❌
                </div>
              </>
            ) : (
              <>
                <div className='grid scroll-smooth items-start overflow-y-auto min-h-fit h-96 no-scrollbar place-items-center md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-center -my-32 md:my-0'>
                  {filteredNotes?.map(({ _id, title, content, updatedAt }) => (
                    <Note
                      key={_id}
                      refresh={refresh}
                      id={_id}
                      title={title}
                      content={content}
                      updatedAt={updatedAt}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <Navigate to='/login' />
        )}
      </div>
    </div>
  );
}
