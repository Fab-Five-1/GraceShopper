import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
/**
 * COMPONENT
 */
const Checkout = () => {
  const username = useSelector((state) => state.auth.me.username);

  return (
    <div>
      <Link to="/cart">
        <button type="button">Back</button>
      </Link>
      <h3>Welcome {username}, you owe us alot of money!</h3>
    </div>
  );
};

export default Checkout;
