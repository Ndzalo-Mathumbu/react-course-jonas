// import { useState } from "react";

const Bill = function ({ onControllBill, controlBill }) {
  //   const [controlBill, setControlBill] = useState(0);

  return (
    <>
      <div>
        How much was the Bill: R
        <input
          type="number"
          value={controlBill}
          onChange={(e) => onControllBill(e.target.value)}
        />
      </div>
    </>
  );
};
export default Bill;
