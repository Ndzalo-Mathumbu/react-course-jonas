import { useState } from "react";

const messages = ["Wake Up 🛏", "Bath 🛁", "Go To School 🏫"];

const App = function () {
  const [stepIN, setStep] = useState(1);
  const [card, setCard] = useState(true);
  const next = function () {
    setStep((a) => Math.min(a + 1, 3));
  };
  const previous = function () {
    setStep((a) => Math.max(a - 1, 0));
  };

  const handleCard = function () {
    setCard((cardOpen) => !cardOpen);
  };

  // const stepIN = 1;
  /*  const add = () => (stepIN += 1); */
  return (
    <>
      {card && (
        <div className={`steps`}>
          <div className="numbers">
            <div className={` ${stepIN >= 1 ? `active` : ""}`}>1</div>
            <div className={`${stepIN >= 2 ? `active` : ""}`}>2</div>
            <div className={`${stepIN >= 3 ? `active` : ""}`}>3</div>
          </div>
          <p className="message">
            step {stepIN}: {messages.at(stepIN - 1)}
          </p>
          <div className="buttons">
            <button style={{ backgroundColor: "darkgray" }} onClick={previous}>
              Previous
            </button>
            <button style={{ backgroundColor: "darkgray" }} onClick={next}>
              Next
            </button>
          </div>
        </div>
      )}
      <button
        style={{
          margin: "0 auto",
          display: "block",
          width: "120px",
          height: "50px",
          border: "none",
          borderRadius: "5px",
          backgroundColor: "darkgray",
          fontSize: "large",
        }}
        onClick={handleCard}
      >
        Hide Card
      </button>
    </>
  );
};

// export default App;

const App2 = function () {
  return (
    <>
      <DateCounter />
    </>
  );
};

const DateCounter = function () {
  const [countnum, setCountnum] = useState(0);
  const [stepnum, setStepnum] = useState(1);
  const [date, setDate] = useState(new Date());
  const stepdiv = {
    display: "flex",
    margin: "0 auto",
    width: "10vw",
    // backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    gap: "5px",
    height: "8vh",
  };
  const styleText = {
    display: "flex",
    margin: "0 auto",
    justifyContent: "center",
    alignItems: "center",
  };
  const handleAddCounter = () => {
    setCountnum((a) => a + stepnum);
  };
  const handleMinusCounter = () => {
    setCountnum((a) => a - stepnum);
  };

  const handleAddStep = () => {
    setStepnum((a) => a + 1);
  };
  const handleMinusStep = () => {
    setStepnum((a) => a - 1);
  };

  /* const datecount = new Date();

  const dateFomat = new Intl.DateTimeFormat("en-ZA", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).formatToParts(datecount);

  const day = dateFomat.find((x) => x.type === "day").value;

  console.log(+day + 1);

  console.log(dateFomat); */

  /* const handleAddDate = function () {
    const myDate = new Date(date);
    myDate.setDate(() => myDate.getDate() + 1);
    setDate(myDate);
    console.log(myDate);
  }; */
  return (
    <>
      <div style={stepdiv}>
        step: {stepnum} <button onClick={handleAddStep}>+</button>
        <button onClick={handleMinusStep}>-</button>
      </div>
      <div style={stepdiv}>
        Count: {countnum}
        <button onClick={handleAddCounter}>+</button>
        <button onClick={handleMinusCounter}>-</button>
      </div>
      <p style={styleText}>
        {countnum} Days From Today Is Friday {/* {date.getDate()} */}
      </p>
    </>
  );
};

export default App2;
