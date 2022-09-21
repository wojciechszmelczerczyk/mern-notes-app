const Search = ({ focus, handleUserInput }) => {
  const [isFocus, setIsFocus] = focus;

  return (
    <div>
      <input
        className='searchInput'
        placeholder='Search note'
        onChange={(e) => handleUserInput(e.target.value)}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      ></input>
    </div>
  );
};

export default Search;
