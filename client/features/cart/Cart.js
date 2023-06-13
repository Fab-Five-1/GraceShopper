import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

/**
 * COMPONENT
 */
const Cart = () => {
  const username = useSelector((state) => state.auth.me.username);

  return (
    <div>
      <h1>YO {username}</h1>
      <h3>Welcome to your cart</h3>
      <h3>Ready to checkout?</h3>
      <Link to="/checkout">
        <button type="button">Checkout</button>
      </Link>
    </div>
  );
};

export default Cart;


// michelle 