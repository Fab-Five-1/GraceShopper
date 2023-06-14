import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

/**
 * COMPONENT
 */
const Cart = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const username = useSelector((state) => state.auth.me.username);

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h1>Welcome to your cart, {username}!</h1>
          <section style={{ border: "5px solid red" }}>
            ITEMS<h3>TOTAL</h3>
          </section>
          <h3>Ready to checkout?</h3>
          <Link to="/checkout">
            <button type="button">Checkout</button>
          </Link>
        </div>
      ) : (
        <div>
          <h1>Hi you're not signed in!</h1>
          <h3>Would you like to login or sign up?</h3>
          <Link to="/login">Login</Link>
          <br></br>
          <Link to="/signup">Sign Up</Link>
          <h3>Or continue as guest</h3>
          <Link to="/guestcheckout">Continue</Link>
        </div>
      )}
    </div>
  );
};

export default Cart;

// michelle
