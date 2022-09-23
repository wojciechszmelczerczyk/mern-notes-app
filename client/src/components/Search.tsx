const Search = ({ focus, handleUserInput }) => {
  const [isFocus, setIsFocus] = focus;

  return (
    <div>
      <input
        className='hidden px-1 border rounded-lg md:block'
        placeholder='Search note'
        onChange={(e) => handleUserInput(e.target.value)}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      ></input>
    </div>
  );
};

export default Search;
