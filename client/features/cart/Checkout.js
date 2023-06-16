import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUsersCart, selectCart } from "./CartSlice";
/**
 * COMPONENT
 */
const Checkout = () => {
  const name = useSelector((state) => state.auth.me.firstName);
  const dispatch = useDispatch();
  const { orders } = useSelector(selectCart);

  useEffect(() => {
    dispatch(fetchUsersCart());
  }, [fetchUsersCart]);

  let orderTotal = [];

  if (Array.isArray(orders)) {
    orderTotal = orders.map((info) => info.total);
  } else if (orders && typeof orders === "object") {
    orderTotal = orders.total;
  }

  return (
    <div>
      <Link to="/cart">
        <button type="button">Back</button>
      </Link>
      <h3>
        Welcome {name}, you owe {`$ ${orderTotal}`}!
      </h3>
      <form>
        <div>
          <label htmlFor="email"> Email </label>
          <input type="text" name="email" />
          <label htmlFor="shipping"> Shipping Address </label>
          <input type="text" name="shipping" />
          <label htmlFor="card"> Card Number </label>
          <input type="text" name="card" />
          <label htmlFor="cvv"> CVV </label>
          <input type="text" name="cvv" />
          <button> Purchase </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
