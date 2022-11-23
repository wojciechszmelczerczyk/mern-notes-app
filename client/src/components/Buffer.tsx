import "../css/index.css";

const Buffer = ({ text }) => {
  return (
    <div
      className={
        text.length === 0
          ? "hidden"
          : "absolute top-2/4 left-2/4 overflow-scroll no-scrollbar h-16 w-48 rounded-xl bg-slate-400"
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
