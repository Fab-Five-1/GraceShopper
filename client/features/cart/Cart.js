import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUsersCart, selectCart } from "./CartSlice";

/**
 * COMPONENT
 */
const Cart = () => {
  const dispatch = useDispatch();
  const usersInfo = useSelector(selectCart);
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const username = useSelector((state) => state.auth.me.username);

  useEffect(() => {
    dispatch(fetchUsersCart());
  }, []);
  const { user, orders, orderProducts, products } = usersInfo;
  console.log("INFO", user, orders[0], orderProducts[0], products[0]);

  let test;

  if (Array.isArray(orders) && orders.length > 0) {
    test = orders;
    console.log(orders[0].id);
    console.log("fulfilled", orders[0].fulfilled);
  } else {
    console.log("No orders available or 'orders' is not an array.");
  }
  // HOW IS THIS POSSIBLE
  console.log(typeof orders);
  console.log(Array.isArray(orders));
  console.log("TEST", typeof test);

  for (const obj in orders) {
    console.log(obj);
  }

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h1>Welcome to your cart, {username}!</h1>
          <section style={{ border: "5px solid red" }}>
            <h2>Items:</h2>
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
