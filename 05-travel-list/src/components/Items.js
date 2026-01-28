import { useState } from "react";

const Item = function ({ listObj, onDelete }) {
  const [checkboxed, setCheckboxed] = useState(false);
  // const [packedItem, setPackedItem] = useState([]);
  return (
    <li>
      <input
        type="checkbox"
        value={listObj.packed}
        onChange={(e) => {
          if (e.target.checked) {
            setCheckboxed(true);
          } else {
            setCheckboxed(false);
          }
        }}
      />
      <span style={checkboxed ? { textDecoration: "line-through" } : {}}>
        {listObj.quantity} {listObj.description}
      </span>
      <button onClick={() => onDelete(listObj.id)}>❌</button>
    </li>
  );
};

export default Item;
