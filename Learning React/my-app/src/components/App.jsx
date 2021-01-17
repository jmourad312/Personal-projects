import React, {useState} from "react";


function App() {

  const [fullName, setFullName] = useState({
    firstName: "",
    lastName: "",
  });
  function handleChange (event) {
    // const newValue = event.target.value;
    // const inputName = event.target.name;
    const {value, name} = event.target;

    // console.log(value);
    // console.log(name);

    setFullName(previousValue=>{
      console.log(previousValue);
      if (name === "firstName") {
        return {
          firstName : value,
          lastName : previousValue.lastName
        }
      } else if (name === "lastName"){
        return {
          firstName : previousValue.firstName,
          lastName : value
        }
      }
    })

  }

  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [headingText, setHeadingText] = useState("");

  // function handleChangeFirst (event) {
  //   setFirstName(event.target.value);
  // }
  // function handleChangeLast (event) {
  //   setLastName(event.target.value);
  // }
  // function handleClick (event) {
  //   setHeadingText(firstName + " " + lastName);
  //   event.preventDefault();
  // }


  return (
    <div className="container">
      {/* <h1>Hello {headingText}</h1> */}
      {/* <h1>Hello {firstName} {lastName}</h1> */}
      <h1>Hello {fullName.firstName} {fullName.lastName}</h1>


      <form>
        <input 
        name="firstName" 
        onChange={handleChange}
        // onChange={handleChangeFirst} 
        placeholder="First Name" 
        value={fullName.firstName}  
        />
        
        <input 
        name="lastName" 
        onChange={handleChange}
        // onChange={handleChangeLast}
        placeholder="Last Name" 
        value={fullName.lastName}  
        />

        <button 
        // onClick={handleClick}
        >Submit</button>
      </form>
    </div>
  );
}

export default App;
