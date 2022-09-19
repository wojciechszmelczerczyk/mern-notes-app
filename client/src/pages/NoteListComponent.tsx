import { useState, useEffect } from "react";
import noteService from "../services/noteService";
import Note from "../components/Note";
import { Navigate } from "react-router-dom";
import Search from "../components/Search";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortAlphaAsc,
  faSortAlphaDesc,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import speech from "../svg/speech.svg";
import { SidebarContext } from "../context/SidebarContext";
import Sidebar from "../components/mobile/Sidebar";

export default function NoteListComponent() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const focus = [isFocus, setIsFocus];
  const [isLoggedIn] = useContext(AuthContext);
  const [isSidebarActive] = useContext(SidebarContext);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

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

    function handleResize() {
      setHeight(window.innerHeight);
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [refreshFlag, height, width]);

  const handleUserInput = function (search) {
    const filteredNoteArray = notes.filter((note) =>
      note.title.includes(search)
    );
    setFilteredNotes(filteredNoteArray);
    if (search.length === 0) setFilteredNotes(notes);
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
    <div>
      {isLoggedIn ? (
        <>
          <Navbar />
          {width < 1000 && height < 600 && width > height ? (
            <h1 className='appTitleIcon'>
              <img src={speech} alt='' />
            </h1>
          ) : (
            <h1 className='noteListTitle'>
              Speech
              <img src={speech} alt='' />
              Notes
            </h1>
          )}

          {notes?.length === 0 ? (
            <div className='emptyNoteListInfo'>No notes add some!✍️</div>
          ) : (
            <>
              {(width < 1000 && height < 800 && width < height) ||
              (width < 1000 && height < 800 && width > height) ? (
                ""
              ) : (
                <>
                  <Search focus={focus} handleUserInput={handleUserInput} />
                  <FontAwesomeIcon
                    style={{ cursor: "pointer" }}
                    className='orderIcon'
                    onClick={handleSort}
                    icon={order === "asc" ? faSortAlphaAsc : faSortAlphaDesc}
                  />
                </>
              )}
            </>
          )}

          {filteredNotes?.length === 0 && isFocus ? (
            <>
              <div className='emptyNoteListInfo'>Note not found❌</div>
            </>
          ) : (
            <>
              {isSidebarActive ? <Sidebar /> : ""}
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
