import React, { useState } from "react";

function InputArea(props) {
  const [listItem, setListItem] = useState("");

  function handleChange(event) {
    const value = event.target.value;
    setListItem(value);
  }

  return (
    <div className="form">
      <input 
      type="text" 
      value={listItem} 
      onChange={handleChange} 
      />

      <button 
      onClick={()=>{
        props.onClick(listItem);
        setListItem("");
      }}
      >
        <span>Add</span>
      </button>
    </div>
  );
}

export default InputArea;
