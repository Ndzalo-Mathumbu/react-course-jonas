import { useState } from "react";
import Item from "./Items";

const PackageList = function ({ newList, onDelete, onDeleteALL }) {
  const [sortItem, setSortItem] = useState("input");

  let sortedItem;

  if (sortItem === "input") sortedItem = newList;
  if (sortItem === "alphabetically")
    sortedItem = newList
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortItem === "most-quantity")
    sortedItem = newList.slice().sort((a, b) => b.quantity - a.quantity);
  if (sortItem === "least-quantity")
    sortedItem = newList.slice().sort((a, b) => a.quantity - b.quantity);

  return (
    <>
      <div className="list">
        <ul>
          {sortedItem.map((x) => (
            <Item listObj={x} key={x.id} onDelete={onDelete} />
          ))}
        </ul>
        <div className="actions">
          <select
            value={sortItem}
            onChange={(e) => setSortItem(() => e.target.value)}
          >
            <option value="input">Sort by input</option>
            <option value="alphabetically">Sort alphabetically</option>
            <option value="most-quantity">Sort by most quantity</option>
            <option value="least-quantity">Sort by least quantity</option>
          </select>
          <button
            style={{ backgroundColor: "red", color: "white" }}
            onClick={onDeleteALL}
          >
            Clear List
          </button>
        </div>
      </div>
    </>
  );
};
export default PackageList;
