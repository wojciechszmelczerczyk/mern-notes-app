import "../custom.css";

const Buffer = ({ text }) => {
  return (
    <div>
      {text ? (
        <div id='buffer'>
          <p>{text}</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Buffer;
