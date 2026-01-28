import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackageList from "./PackingList";
import Stats from "./Stats";
import "../style.css";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];

const App = function () {
  const [addToList, setAddToList] = useState(initialItems);
  // console.log(numOfItemInArray);
  const handleAddToList = function (objNew) {
    setAddToList((x) => [...x, objNew]);
  };
  const handleDelete = function (itemID) {
    setAddToList((x) => x.filter((bin) => bin.id !== itemID));
  };
  const handleDeleteALL = function () {
    if (!addToList.length) {
      alert("List already empty");
      return;
    }
    const deleteConfirmed = window.confirm(
      "Are you sure you want to clear your list?"
    );
    if (deleteConfirmed) setAddToList((x) => x.filter(() => false));
  };
  return (
    <div className="app">
      <Logo />
      <Form onAddList={handleAddToList} />
      <PackageList
        newList={addToList}
        onDelete={handleDelete}
        onDeleteALL={handleDeleteALL}
      />
      <Stats numItems={addToList} />
    </div>
  );
};

export default App;

///// practicing state /////

/* const reactFlashcards = [
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
]; */

const App2 = function () {
  /* return (

**MY OWN TRY WITHOUT LESSON** (FAILED)
  
    <>
      <div>
        <FlashCards />
      </div>
    </>
  ); */
  return <>{/* <FlashCards /> */}</>;
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

/* const FlashCards = function () {
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
 */

///// Practice Exercise 👇 /////

const faqs = [
  {
    // id: Date.now(),
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    // id: Date.now(),
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    // id: Date.now(),
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];

const AppTwo = function () {
  return (
    <div>
      <Accordion data={faqs} />
      {/* <AccordionItem /> */}
    </div>
  );
};

function Accordion({ data }) {
  return (
    <div className="accordion">
      {data.map((a, i) => (
        <AccordionItem title={a.title} answer={a.text} num={i + 1} key={i} />
      ))}
    </div>
  );
}

const AccordionItem = function ({ num, title, answer }) {
  const [open, setOpen] = useState(false);
  const handleOpen = function () {
    setOpen((a) => !a);
  };
  return (
    <>
      <div className={`item ${open ? "open" : ""}`} onClick={handleOpen}>
        <p className="number">{num < 9 ? `0${num}` : num}</p>
        <p className="title">{title}</p>
        <p className="icon">{open ? `+` : `-`}</p>
      </div>
      {open && <div className="content-box">{answer}</div>}
    </>
  );
};

// export default AppTwo;
