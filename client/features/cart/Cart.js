import React from "react";
import { useSelector } from "react-redux";

/**
 * COMPONENT
 */
const Cart = () => {
  const username = useSelector((state) => state.auth.me.username);

  return (
    <div>
      <h1>YO</h1>
      <h3>Welcome, {username} to your cart</h3>
    </div>
  );
};

export default Cart;
