import { useState } from "react";

const FriendService = function ({
  name,
  controlBill,
  onControllBill,
  tipResult,
  onSetTip,
}) {
  const [ControlService, setControlService] = useState("none");

  const TipPercent = [0, 5, 10];
  const Total = TipPercent.map((a) => Math.round((a / 100) * controlBill))
    .map((a) => a / 100)
    .map((a) => a * controlBill);

  onSetTip(() => {
    if (ControlService === "good") return Total[2] + controlBill;
    if (ControlService === "bad") return Total[1] + controlBill;
    if (ControlService === "worst") return Total[0] + controlBill;
  });
  /* onSetTip(() => ControlService === "bad" && Total[1] + controlBill);
    onSetTip(() => ControlService === "worst" && Total[0] + controlBill); */

  console.log(Total, typeof controlBill);
  console.log(ControlService);
  console.log(tipResult);

  // const result = (TipPercent / 100) * Bill;
  return (
    <>
      <div>
        {name}{" "}
        <select
          value={ControlService}
          onChange={(e) => setControlService(e.target.value)}
        >
          <option value="none">Not selected</option>
          <option value="good">{`good (10%)`}</option>
          <option value="bad">bad (5%)</option>
          <option value="worst">worst (0%)</option>
        </select>
      </div>
    </>
  );
};
export default FriendService;
