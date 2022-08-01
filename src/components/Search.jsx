const Search = ({ focus, handleUserInput }) => {
  const [isFocus, setIsFocus] = focus;
  return (
    <>
      <input
        className='searchInput'
        placeholder='Search note'
        onChange={(e) => handleUserInput(e.target.value)}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
    </>
  );
};

export default Search;
