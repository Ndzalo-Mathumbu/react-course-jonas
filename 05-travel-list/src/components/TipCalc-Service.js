import { useState } from "react";

const FriendService = function ({ name, controlBill, onControllBill }) {
  const [ControlService, setControlService] = useState("");
  console.log(ControlService);
  const TipPercent = [0, 10, 20];
  const Total = TipPercent.map((a) => (a / 100) * controlBill)
    .map((a) => a / 100)
    .map((a) => Math.round(a * controlBill));
  console.log(Total);
  const result1 = ControlService === "good" && Total.at(2) + controlBill;
  console.log(result1); /* **************** Ended here */
  // const result = (TipPercent / 100) * Bill;
  return (
    <>
      <div>
        {name}{" "}
        <select
          value={ControlService}
          onChange={(e) => setControlService(e.target.value)}
        >
          <option value="good">{`good (20%)`}</option>
          <option value="bad">bad (10%)</option>
          <option value="worst">worst (0%)</option>
        </select>
      </div>
    </>
  );
};
export default FriendService;
