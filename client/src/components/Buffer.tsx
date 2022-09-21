import "../css/index.css";

const Buffer = ({ text }) => {
  return (
    <div>
      {text ? (
        <div id='buffer'>
          <p className='bufferText'>{text}</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Buffer;
