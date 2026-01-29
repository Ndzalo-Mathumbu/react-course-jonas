const CalculationOutput = function ({ controlBill }) {
  return (
    <>
      {controlBill && (
        <h2>
          You will pay R{controlBill} (R{controlBill} + R (30) tip)
        </h2>
      )}
    </>
  );
};
export default CalculationOutput;
