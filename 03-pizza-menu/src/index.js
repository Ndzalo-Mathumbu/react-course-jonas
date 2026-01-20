import React from "react";
import ReactDom from "react-dom/client";
import "./index.css";
// import PizzaFocaccia from "03-pizza-menu/public/pizzas/focaccia.jpg";

const pizzaData = [
  {
    id: 1,
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    id: 2,
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    id: 3,
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    id: 4,
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    id: 5,
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    id: 6,
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

// const findPizza = function (pizzaId) {
//   return pizzaData.find((el) => el.id === pizzaId);
// };

// const foundPizza = findPizza(1);
// const foundPizza2 = findPizza(2);
// const foundPizza3 = findPizza(3);
// const foundPizza4 = findPizza(4);
// const foundPizza5 = findPizza(5);
// const foundPizza6 = findPizza(6);

// console.log(foundPizza);

const App = function () {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
};

///// Pizza menu Components /////

const Header = function () {
  const styling = {
    color: "darkorange",
    fontSize: "2.6em",
    textTransform: "uppercase",
  };
  return (
    <header className="header">
      <h1 style={styling}> Online Pizza Shop</h1>
    </header>
  );
};

const Menu = function () {
  return (
    <main className="menu">
      <h2>Our Menu</h2>
      <ul className="pizzas">
        {pizzaData.map((pizza) => (
          <Pizza pizzaObject={pizza} key={pizza.id} />
        ))}
      </ul>
      {/* <Pizza
        picture="./pizzas/focaccia.jpg"
        ingredient={foundPizza.ingredients}
        name={foundPizza.name}
        price={foundPizza.price}
        alt={foundPizza.name}
      />
      <Pizza
        picture="./pizzas/margherita.jpg"
        ingredient={foundPizza2.ingredients}
        name={foundPizza2.name}
        price={foundPizza2.price}
        alt={foundPizza2.name}
      />
      <Pizza
        picture="./pizzas/spinaci.jpg"
        ingredient={foundPizza3.ingredients}
        name={foundPizza3.name}
        price={foundPizza3.price}
        alt={foundPizza3.name}
      />
      <Pizza
        picture="./pizzas/funghi.jpg"
        ingredient={foundPizza4.ingredients}
        name={foundPizza4.name}
        price={foundPizza4.price}
        alt={foundPizza4.name}
      /> */}
    </main>
  );
};

const Pizza = function (props) {
  console.log(props);
  return (
    <li className="pizza">
      <img src={props.pizzaObject.photoName} alt={props.alt} />
      <div>
        <h3>{props.pizzaObject.name}</h3>
        <p>{props.pizzaObject.ingredients}</p>
        <span>{props.pizzaObject.price + 1}</span>
      </div>
    </li>
  );
};

const Footer = function () {
  const hour = new Date().getHours();
  const houropen = 8;
  const hourClose = 22;
  const shopOpen = hour >= houropen && houropen <= hourClose;
  console.log(houropen, shopOpen);

  // hour >= houropen && houropen <= hourClose
  //   ? alert("Shop is open")
  //   : alert("Shop is not open");

  return (
    <footer className="footer">
      <p>Pizza Shop Is Open {hour}</p>
    </footer>
  );
};

///// Render the root or the app in the DOM /////
ReactDom.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

///// Challenge No.1 building a developer card 👇 /////
/* const App2 = function () {
  return (
    <>
      <Card />
    </>
  );
};

const Card = function () {
  const styleCard = {
    width: "390px",
    height: "460px",
    backgroundColor: "blue",
    margin: "0 auto",
    borderRadius: "5px",
    border: "2px solid black",
  };
  const styleIMG = {
    width: "100%",
    height: "55%",
    objectFit: "cover",
  };

  const styleName = {
    textAlign: "center",
    color: "white",
    marginTop: "7px",
    fontFamily: "Inter",
  };

  const styleInfo = {
    textAlign: "center",
    color: "white",
    marginTop: "-7px",
    fontFamily: "Inter",
    padding: "1px",
  };

  return (
    <div style={styleCard}>
      <img
        style={styleIMG}
        src="https://velaranks.com/wp-content/uploads/2024/12/Software-Development.webp"
        alt="coder"
      />
      <h2 style={styleName}>John Doe</h2>
      <h3 style={styleInfo}>
        John Doe is a coder who writes bugs professionally and occasionally
        fixes them by accident. Debugging is his cardio, coffee is his fuel, and
        “it works on my machine” is his battle cry.
      </h3>
      <div
        style={{
          display: "flex",
          gap: "2px",
          position: "relative",
          left: "-4.9px",
        }}
      >
        <Skills skillName="HTML + CSS🎨" color="red" />
        <Skills skillName="Javascript🤖" color="orange" />
        <Skills skillName="React😀" color="skyblue" />
      </div>
    </div>
  );
};

const Skills = function (props) {
  const styleSkills = {
    backgroundColor: props.color,
    width: "150px",
    borderRadius: "5px",
    textAlign: "center",
    fontFamily: "Inter",
    color: "white",
    position: "relative",
    bottom: "13px",
    left: "5px",
    // display: "flex",
    // marginTop: "3px",
  };
  return <div style={styleSkills}>{props.skillName}</div>;
};

ReactDom.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App2 />
  </React.StrictMode>
);
 */
