import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";
import Note from "./Note";

const Search = ({
  autoFocus,
  notesCopy,
  setNotesCopy,
  refresh,
  focus,
  handleUserInput,
}) => {
  const [isFocus, setIsFocus] = focus;
  const [isSearchActive, setIsSearchActive] = useContext(SearchContext);

  return (
    <div>
      <input
        style={{
          top: autoFocus ? "15%" : "",
          left: autoFocus ? "20%" : "",
          border: autoFocus ? "none" : "",
          borderRadius: autoFocus ? "0" : "",
        }}
        className='searchInput'
        placeholder='Search note'
        onChange={(e) => handleUserInput(e.target.value)}
        onFocus={() => setIsFocus(true)}
        onBlur={() => {
          setIsFocus(false);
        }}
        autoFocus={autoFocus}
      ></input>
      <div
        className='mobileNotesContainer'
        style={{
          position: "absolute",
          display: "flex",
          flexWrap: "wrap",
          top: "23.8%",
          left: "20%",
          width: "250px",
        }}
      >
        {notesCopy.length === 0 && isSearchActive ? (
          <div style={{ color: "white" }}></div>
        ) : (
          <>
            {isSearchActive ? (
              <>
                {notesCopy.map(({ _id, title, content, updatedAt }) => (
                  <Note
                    key={_id}
                    refresh={refresh}
                    id={_id}
                    title={title}
                    content={content}
                    updatedAt={updatedAt}
                  />
                ))}
              </>
            ) : (
              ""
            )}
          </>
        )}
      </div>
      {autoFocus ? (
        <div
          style={{
            position: "absolute",
            top: "0",
            right: "2%",
            fontSize: 30,
            color: "white",
            cursor: "pointer",
          }}
          onClick={() => {
            setNotesCopy([]);
            setIsSearchActive(false);
          }}
        >
          X
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Search;
