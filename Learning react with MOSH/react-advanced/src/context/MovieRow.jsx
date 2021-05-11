import React, { useContext } from "react";
import CartContext from "./cartContext";
import UserContext from "./userContext";

export default function MovieRow() {
  const userContext = useContext(UserContext);
  const cartContext = useContext(CartContext);
    console.log("cartContext",cartContext);
  return (
    <div>
      Movie Row {userContext.currentUser ? userContext.currentUser.name : ""}
    </div>
  );
}
