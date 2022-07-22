import "../custom.css";

const Note = ({ title, content, updatedAt, key }) => {
  let updated = updatedAt.replace(/T|Z|/gi, "").slice(-22, -4);

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
