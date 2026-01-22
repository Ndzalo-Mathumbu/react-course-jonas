import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

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
    setCard(!card);
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

export default App;
