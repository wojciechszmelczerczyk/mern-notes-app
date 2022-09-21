import { useState } from "react";
import Note from "../Note";
import Search from "../Search";

const SearchPopup = ({
  notesCopy,
  setNotesCopy,
  refresh,
  focus,
  handleUserInput,
}) => {
  return (
    <>
      <div
        className='searchPopup'
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column-reverse",
          alignItems: "center",
          height: "100%",
          width: "100%",
          bottom: "0",
          right: "0",
          zIndex: "2",
          backgroundColor: "black",
        }}
      >
        <Search
          autoFocus={true}
          notesCopy={notesCopy}
          setNotesCopy={setNotesCopy}
          refresh={refresh}
          focus={focus}
          handleUserInput={handleUserInput}
        />
      </div>
    </>
  );
};

export default SearchPopup;
