import { useState } from "react";

const Form = function ({ onAddList }) {
  const [description, setDescription] = useState("");
  const [selectEl, setSelectEl] = useState(1);

  const handleSubmit = function (e) {
    e.preventDefault();
    if (description === "") return;
    const addItem = {
      description: description,
      quantity: selectEl,
      packed: false,
      id: Date.now(),
    };
    onAddList(addItem);
    // console.log(addToList);
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
export default Form;
