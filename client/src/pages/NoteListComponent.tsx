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
} from "@fortawesome/free-solid-svg-icons";

export default function NoteListComponent() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const focus = [isFocus, setIsFocus];
  const [isLoggedIn] = useContext(AuthContext);
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
          <h1 className='noteListTitle'>
            Speech
            <svg
              className='speechWaveIcon'
              version='1.0'
              xmlns='http://www.w3.org/2000/svg'
              width='50.000000pt'
              height='50.000000pt'
              viewBox='0 0 50.000000 50.000000'
              preserveAspectRatio='xMidYMid meet'
            >
              <g
                transform='translate(0.000000,50.000000) scale(0.100000,-0.100000)'
                fill={"red"}
                stroke='none'
              >
                <path
                  d='M120 250 c0 -120 4 -190 10 -190 6 0 10 70 10 190 0 120 -4 190 -10
190 -6 0 -10 -70 -10 -190z'
                />
                <path
                  d='M360 250 c0 -120 4 -190 10 -190 6 0 10 70 10 190 0 120 -4 190 -10
190 -6 0 -10 -70 -10 -190z'
                />
                <path
                  d='M60 250 c0 -60 4 -100 10 -100 6 0 10 40 10 100 0 60 -4 100 -10 100
-6 0 -10 -40 -10 -100z'
                />
                <path
                  d='M420 250 c0 -60 4 -100 10 -100 6 0 10 40 10 100 0 60 -4 100 -10
100 -6 0 -10 -40 -10 -100z'
                />
                <path
                  d='M180 250 c0 -53 4 -90 10 -90 6 0 10 37 10 90 0 53 -4 90 -10 90 -6
0 -10 -37 -10 -90z'
                />
                <path
                  d='M300 250 c0 -53 4 -90 10 -90 6 0 10 37 10 90 0 53 -4 90 -10 90 -6
0 -10 -37 -10 -90z'
                />
                <path
                  d='M0 250 c0 -22 5 -40 10 -40 6 0 10 18 10 40 0 22 -4 40 -10 40 -5 0
-10 -18 -10 -40z'
                />
                <path
                  d='M240 250 c0 -22 5 -40 10 -40 6 0 10 18 10 40 0 22 -4 40 -10 40 -5
0 -10 -18 -10 -40z'
                />
                <path
                  d='M480 250 c0 -22 5 -40 10 -40 6 0 10 18 10 40 0 22 -4 40 -10 40 -5
0 -10 -18 -10 -40z'
                />
              </g>
            </svg>
            Notes
          </h1>
          {notes?.length === 0 ? (
            <div className='emptyNoteListInfo'>No notes add some!✍️</div>
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

          {filteredNotes?.length === 0 && isFocus ? (
            <>
              <div className='emptyNoteListInfo'>Note not found❌</div>
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
