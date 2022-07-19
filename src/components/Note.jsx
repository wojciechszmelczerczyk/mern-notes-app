import "../custom.css";

const Note = ({ title, content, key }) => {
  return (
    <div className='note' key={key}>
      <h1 className='noteTitle'>{title}</h1>
      <h2 className='noteContent'>{content}</h2>
    </div>
  );
};

export default Note;
