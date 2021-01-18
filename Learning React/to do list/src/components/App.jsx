import React, { useState } from "react";

function App() {
  const [listItem, setListItem] = useState("");
  const [items, setItems] = useState([])

  function handleChange(event) {
    const value = event.target.value;
    setListItem(value);
  }
  function handleClick() {
    setItems(previousItems => {
      return [...previousItems, listItem];
    });
    setListItem("");
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input 
        type="text"
        value={listItem}
        onChange={handleChange}
        />

        <button onClick={handleClick}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {items.map((todoItem)=><li>{todoItem}</li>)}
        </ul>
      </div>
    </div>
  );
}

export default App;
