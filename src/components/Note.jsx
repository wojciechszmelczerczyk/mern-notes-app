import "../custom.css";

const Note = ({ title, content, updatedAt, key }) => {
  // change date format
  let updated = updatedAt.replace(/T|Z/g, " ").substr(0, updatedAt.length - 5);

  return (
    <>
      <div className='note' key={key}>
        <h2 className='noteContent'>{content}</h2>
      </div>
      <h1 className='noteTitle'>{title}</h1>
      <h2 className='dou'>{updated}</h2>
    </>
  );
};

export default Note;
