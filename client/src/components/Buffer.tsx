import "../css/index.css";

const Buffer = ({ text }) => {
  return (
    <div
      className={
        text.length === 0
          ? "hidden"
          : "absolute top-1/4 left-2/4 -translate-x-2/4	 overflow-scroll no-scrollbar h-16 w-80 rounded-xl bg-white-400 shadow-md"
      }
    >
      {text ? (
        <div id='buffer'>
          <p className='px-1 py-1 bufferText'>{text}</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Buffer;
