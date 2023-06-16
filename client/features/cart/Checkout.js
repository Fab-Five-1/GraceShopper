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
    </div>
  );
};

export default Checkout;
