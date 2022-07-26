const Search = ({ handleUserInput }) => {
  return (
    <>
      <input
        className='searchInput'
        placeholder='Search note'
        onChange={(e) => handleUserInput(e.target.value)}
      />
    </>
  );
};

export default Search;
