import { useEffect, useState } from "react";

const App = function () {
  const [advice, setAdvice] = useState("");
  const [count, setCount] = useState(0);
  const fetchAdvise = async function () {
    const result = await fetch("https://api.adviceslip.com/advice");
    const data = await result.json();
    console.log(data.slip.advice);
    setAdvice(() => data.slip.advice);
    setCount((Num) => ++Num);
  };
  useEffect(function () {
    fetchAdvise();
  }, []);
  return (
    <div>
      <h1>"{advice}"</h1>
      <button onClick={fetchAdvise}>Fetch Advise</button>
      <Message count={count} />
    </div>
  );
};

const Message = function (props) {
  return (
    <p>
      You generated <strong>{props.count}</strong> Quotes
    </p>
  );
};

export default App;
