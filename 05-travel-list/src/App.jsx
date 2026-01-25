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
    question: "What is JSX?",
    answer:
      "A syntax extension for JavaScript that looks like HTML and is used in React to describe UI.",
  },
  {
    id: 2,
    question: "What is a component in React?",
    answer:
      "A reusable piece of UI that can be a function or class, returning JSX.",
  },
  {
    id: 3,
    question: "What is the difference between state and props?",
    answer:
      "State is internal and managed by the component; props are external and passed from parent to child.",
  },
  {
    id: 4,
    question: "What is a controlled component?",
    answer:
      "An input element whose value is controlled by React state using value and onChange.",
  },
  {
    id: 5,
    question: "What is a React hook?",
    answer:
      "A special function that lets you use state or other React features in functional components, e.g., useState, useEffect.",
  },
  {
    id: 6,
    question: "What is the purpose of a key in React lists?",
    answer:
      "To give each element a unique identifier so React can efficiently update the DOM.",
  },
];

const App2 = function () {
  return (
    <>
      <FlashCards />
    </>
  );
};

const FlashCards = function () {
  return (
    <>
      <div>
        {reactFlashcards.map((x) => (
          <Showcards cardObj={x} key={x.id} />
        ))}
      </div>
    </>
  );
};

const Showcards = function ({ cardObj }) {
  return <>{cardObj}</>;
};
export default App2;
