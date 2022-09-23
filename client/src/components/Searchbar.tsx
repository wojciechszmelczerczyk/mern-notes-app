import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";

const Searchbar = ({ notes }) => {
  const [isSearchActive, setIsSearchActive] = useContext(SearchContext);
  const [search, setSearch] = useState("");
  const [searchedNotes, setSearchedNotes] = useState([]);
  const navigate = useNavigate();

  const handleInput = (search) => {
    setSearch(search);
    if (search.length > 0) {
      setSearchedNotes(
        notes.filter((note) => note.title.includes(search.toLowerCase()))
      );
    } else {
      setSearchedNotes([]);
    }
  };

  return (
    <div className='flex flex-col min-h-screen min-w-screen bg-white dark:bg-black'>
      <div
        className='grid justify-items-end mx-2 my-1'
        onClick={() => setIsSearchActive(false)}
      >
        <p className='cursor-pointer'>X</p>
      </div>
      <div className='grid justify-items-center'>
        <h1 className='text-xl place-items-center font-taviraj'>
          Search notes🔎
        </h1>
      </div>
      <input
        className='max-h-fit px-1 border rounded-lg'
        onChange={(e) => handleInput(e.currentTarget.value)}
        type='text'
      />
      <div className='justify-self-start no-scrollbar max-h-48 overflow-y-scroll mx-2'>
        {searchedNotes.map(({ title, _id }) => (
          <div className='cursor-pointer border-bottom w-144 my-3'>
            <h1
              className='hover:text-neutral-500 font-taviraj'
              onClick={() => navigate(`note/${_id}`)}
            >
              {title}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Searchbar;
