import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: true },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];

const App = function () {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackageList />
      <Stats />
    </div>
  );
};

const Logo = function () {
  return (
    <>
      <h1>🏖 Happy Vacation 🏝</h1>
    </>
  );
};
const Form = function () {
  const [description, setDescription] = useState("");
  const [selectEl, setSelectEl] = useState(1);
  const [addToList, setAddToList] = useState(initialItems);
  const handleSubmit = function (e) {
    e.preventDefault();
    console.log(e);
    if (description === "") return;
    const addItem = {
      description: description,
      selectEl: selectEl,
      packed: false,
      id: Date.now(),
    };
    console.log(addItem);
    setDescription((x) => (x = ""));
    setSelectEl((x) => (x = 1));
  };
  return (
    <>
      <form className="add-form" onSubmit={handleSubmit}>
        <h3>What do you need for your vacation</h3>
        <select value={selectEl} onChange={(e) => setSelectEl(+e.target.value)}>
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="List Item..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button>add item</button>
      </form>
    </>
  );
};

const PackageList = function () {
  return (
    <>
      <div className="list">
        <ul>
          {initialItems.map((x) => (
            <Item listObj={x} key={x.id} />
          ))}
        </ul>
      </div>
    </>
  );
};

const Stats = function () {
  return (
    <>
      <footer className="stats">
        <em>You have X items on your list, and you already packed X (x%)</em>
      </footer>
    </>
  );
};

const Item = function ({ listObj }) {
  return (
    <li>
      <span style={listObj.packed ? { textDecoration: "line-through" } : {}}>
        {listObj.quantity} {listObj.description}
      </span>
      <button>❌</button>
    </li>
  );
};
// export default App;

const reactFlashcards = [
  {
    id: 1,
    color: "darkgray",
    question: "What is JSX?",
    answer:
      "A syntax extension for JavaScript that looks like HTML and is used in React to describe UI.",
  },
  {
    id: 2,
    color: "red",
    question: "What is a component in React?",
    answer:
      "A reusable piece of UI that can be a function or class, returning JSX.",
  },
  {
    id: 3,
    color: "orange",
    question: "What is the difference between state and props?",
    answer:
      "State is internal and managed by the component; props are external and passed from parent to child.",
  },
  {
    id: 4,
    color: "silver",
    question: "What is a controlled component?",
    answer:
      "An input element whose value is controlled by React state using value and onChange.",
  },
  {
    id: 5,
    color: "green",
    question: "What is a React hook?",
    answer:
      "A special function that lets you use state or other React features in functional components, e.g., useState, useEffect.",
  },
  {
    id: 6,
    color: "blue",
    question: "What is the purpose of a key in React lists?",
    answer:
      "To give each element a unique identifier so React can efficiently update the DOM. ",
  },
];

const App2 = function () {
  /* return (

**MY OWN TRY WITHOUT LESSON** (FAILED)
  
    <>
      <div>
        <FlashCards />
      </div>
    </>
  ); */
  return (
    <>
      <FlashCards />
    </>
  );
};

/* const FlashCards = function () {

**MY OWN TRY BUILDING A FLIPCARD WITHOUT LESSON** (FAILED)

  const [cardAns, setCardAns] = useState("");
  const [cardClicked, setCardClicked] = useState(false);
  const [cardID, setCardID] = useState([]);
  const cards = {
    display: "flex",
    textAlign: "center",
    padding: "12px",
    justifyContent: "center",
    marginBottom: "3px",
    marginTop: "10px",
    alignItems: "center",
    borderRadius: "5px",
    color: "white",
  };

  const UL = {
    listStyle: "none",
    padding: "5px",
    display: "flex",
    gap: "3px",
    flexWrap: "wrap",
    width: "100vw",
    height: "50vh",
    justifyContent: "center",
  };

  const handleCardAnswer = function (answer) {
    setCardAns(answer);
    setCardClicked((x) => {
      x = true;
      return x;
    });
  };
  // console.log(cardClicked);
  console.log(cardID);
  return (
    <>
      <div>
        <ul style={UL}>
          {reactFlashcards.map((x) => (
            <li
              style={{ ...cards, backgroundColor: x.color }}
              key={x.id}
              onClick={() => {
                x.question = x.answer;
                handleCardAnswer(x.answer);
                if (cardClicked === true) setCardID((a) => [...a, x.id]);
                if (cardID.includes(x.id))
                  setCardID((a) => a.filter((z) => z !== x.id));

                return cardAns;
              }}
            >
              {x.question}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}; */

///// After watching lesson ///// (Passed)

const FlashCards = function () {
  const [selectID, setselectID] = useState(null);
  const handleCardAnswer = function (answer) {
    setselectID(answer !== selectID ? answer : null);
  };
  return (
    <div className="flashcard">
      {reactFlashcards.map((x) => (
        <div
          key={x.id}
          onClick={() => handleCardAnswer(x.id)}
          className={x.id === selectID ? "bgColor" : ""}
        >
          <p>{x.id === selectID ? x.answer : x.question}</p>
        </div>
      ))}
    </div>
  );
};

export default App2;
