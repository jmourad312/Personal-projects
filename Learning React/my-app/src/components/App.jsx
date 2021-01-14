import React, { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [headingText, setHeadingText] = useState("")

  function handleChange(event) {
    console.log(event.target.value);
    // console.log(event.target.placeholder);
    // console.log(event.target.type);
    setName(event.target.value);
    setIsSubmitted(false);
  }

  function handleSubmit() {
    // setIsSubmitted(true);
    setHeadingText(name)
    console.log("clicked");
  }

  return (
    <div className="container">
      {/* <h1>Hello {isSubmitted && name}</h1> */}
      <h1>Hello {headingText}</h1>
      <input
        onChange={handleChange}
        type="text"
        placeholder="What's your name?"
        value={name}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;
