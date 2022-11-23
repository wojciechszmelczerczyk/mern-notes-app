import { useContext } from "react";
import { StackContext } from "../context";

import OperationPopup from "./OperationPopup";

const OperationStack = ({ title }) => {
  const [list, { push, pop, peek, length }, listInReverse] =
    useContext(StackContext);

  return (
    <>
      <div className='grid grid-cols-1  fixed bottom-0 right-0  w-32 md:w-64 h-64'>
        {listInReverse.map(() => (
          <OperationPopup title={title} />
        ))}
      </div>
    </>
  );
};

export default OperationStack;
