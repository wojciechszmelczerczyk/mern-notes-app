const OperationPopup = ({ title }) => {
  return (
    <div className='flex rounded-2xl w-32 md:w-64 h-16 opacity-80 bg-green-500'>
      <p className='mx-2 self-center'>Note {title} created</p>
    </div>
  );
};

export default OperationPopup;
