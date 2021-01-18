import React from "react";

function ToDoItem(props) {
    // const [isDone, setisDone] = useState(false);
    // function handleStyle () {
    //     setisDone(!isDone)
    // }
  return (
    <li 
    // className = {isDone ? "strikethrough" : ""}
    // style = {{textDecoration : isDone ? "line-through" : "none"}}
    // onClick={handleStyle}
    onClick={() => {
        props.onChecked(props.id)
    }}
    >
    {props.text}</li>
  );
}

export default ToDoItem;
