import React from "react";

function App() {

  const now = new Date().toLocaleTimeString();

  let [state, setState] = React.useState(now);
  function getTime() {
    const newTime = new Date().toLocaleTimeString();
    setState(newTime);
  }
  setInterval(getTime, 1000);




  return (
    <div className="container">
      <h1>{state}</h1>
      <button onClick={getTime} >Get Time</button>
    </div>
  );
}

export default App;
