import React, { useState } from "react";

function App() {
  const [contact, setContact] = useState({
    fName: "",
    lName: "",
    email: "",
  });

  function handleChange(event) {
    const { value, name } = event.target;
    setContact((previousContact) => {
      if (name === "fName") {
        return {
          fName: value,
          lName: previousContact.lName,
          email: previousContact.email
        };
      } else if (name === "lName"){
        return {
          fName: previousContact.fName,
          lName: value,
          email: previousContact.email
        };
      } else if (name === "email") {
        return {
          fName: previousContact.fName,
          lName: previousContact.lName,
          email: value
        };
      }
    });
  }

  return (
    <div className="container">
      <h1>
        Hello {contact.fName} {contact.lName}
      </h1>
      <p>{contact.email}</p>
      <form>
        <input
          name="fName"
          placeholder="First Name"
          value={contact.fName}
          onChange={handleChange}
        />
        <input 
        name="lName" 
        placeholder="Last Name"
        value={contact.lName}
        onChange={handleChange}
        />
        <input name="email"
        placeholder="Email"
        value={contact.email}
        onChange={handleChange}
       />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
