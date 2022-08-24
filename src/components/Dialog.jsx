import noteService from "../services/noteService";

const Dialog = ({ show, setShow, id, setRefreshFlag, refreshFlag }) => {
  const at = localStorage.getItem("at");

  const deleteDialog = async (val) => {
    if (val === "yes") {
      await noteService.deleteNote(at, id);
      setRefreshFlag(!refreshFlag);
    } else {
      setShow(false);
    }
  };

  return (
    <>
      {show ? (
        <div className='dialog'>
          <p>Do you want to delete note?</p>
          <button onClick={(e) => deleteDialog(e.target.value)} value='yes'>
            yes
          </button>
          <button onClick={(e) => deleteDialog(e.target.value)} value='no'>
            no
          </button>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Dialog;
