import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
import AppTwo from "./StarRating";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <StarRating size={100} maxRating={5} color="orange" /> */}
    <AppTwo />
  </React.StrictMode>,
);
