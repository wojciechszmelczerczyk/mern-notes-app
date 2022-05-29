import "../custom.css";

const Note = ({ title, content, key }) => {
  return (
    <div className='note' key={key}>
      <h1>{title}</h1> <h2>{content}</h2>
    </div>
  );
};

export default Note;
