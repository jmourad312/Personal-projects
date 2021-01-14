import React, {useState} from "react";

function App() {
  const [headingText, setHeadingText] = useState("Hello");
  // const [color, setColor] = useState("white")
  const [color, setColor] = useState(false)


  function handleClick() {
    setHeadingText("Submitted");
  }
  // function mouseOver() {
  //   setColor("black");
  // }
  // function mouseOut() {
  //   setColor("white");
    
  // }
  function mouseOver() {
    setColor(true);
  }
  function mouseOut() {
    setColor(false);
    
  }


  return (
    <div className="container">
      <h1>{headingText}</h1>
      <input type="text" placeholder="What's your name?" />
      {/* <button style={{backgroundColor:color}} onClick={handleClick} onMouseOver={mouseOver} onMouseOut={mouseOut}>Submit</button> */}
      <button style={{backgroundColor: color ? "black" : "white"}} onClick={handleClick} onMouseOver={mouseOver} onMouseOut={mouseOut}>Submit</button>


    </div>
  );
}

export default App;
