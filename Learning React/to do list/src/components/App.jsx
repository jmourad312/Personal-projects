import React, { useState } from "react";
import InputArea from "./InputArea";
import ToDoItem from "./ToDoItem";

function App() {
  const [items, setItems] = useState([]);

  

  function handleClick(listItem) {
    setItems((previousItems) => {
      return [...previousItems, listItem];
    });
    
  }

  function deleteItem (id) {
    console.log(id);
    setItems(previousItems =>{
      return previousItems.filter(
        (item, index)=>{
          return index !== id;
        }
      )
    })
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <InputArea 
      onClick={handleClick}
      />
      {/* <div className="form">
        <input type="text" value={listItem} onChange={handleChange} />

        <button onClick={handleClick}>
          <span>Add</span>
        </button>
      </div> */}
      <div>
        <ul>
          {items.map((todoItem,index) => (
            <ToDoItem 
            key={index}
            id={index}
            onChecked={deleteItem}
            text={todoItem} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
