const Search = ({ handleUserInput }) => {
  return (
    <>
      <input onChange={(e) => handleUserInput(e.target.value)} />
    </>
  );
};

export default Search;
