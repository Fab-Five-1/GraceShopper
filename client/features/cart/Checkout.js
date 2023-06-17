import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUsersCart, selectCart } from "./CartSlice";
import { updateOrder } from "./CheckoutSlice";

const Checkout = () => {
  let userId = useSelector((state) => state.auth.me.id);
  if (!userId) {
    userId = window.localStorage.guest;
  }
  const name = useSelector((state) => state.auth.me.firstName);
  const dispatch = useDispatch();
  const { orders } = useSelector(selectCart);

  useEffect(() => {
    dispatch(fetchUsersCart(userId));
  }, [fetchUsersCart]);

  let orderTotal = [];
  let orderId;

  if (Array.isArray(orders)) {
    orderTotal = orders.map((info) => info.total);
    orderId = orders.map((info) => info.id);
  } else if (orders && typeof orders === "object") {
    orderTotal = orders.total;
    orderId = orders.id;
  }

  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const handlePurchase = (e) => {
    e.preventDefault();

    orderId = orderId[0];

    dispatch(updateOrder({ orderId, fulfilled: true }))
      .then(() => {
        setOrderNumber(orderId);
        setPurchaseSuccess(true);
      })
      .catch((error) => {
        console.log("Error updating order:", error);
      });
  };

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
          <label htmlFor="email">Email</label>
          <input type="text" name="email" />
          <label htmlFor="shipping">Shipping Address</label>
          <input type="text" name="shipping" />
          <label htmlFor="card">Card Number</label>
          <input type="text" name="card" />
          <label htmlFor="cvv">CVV</label>
          <input type="text" name="cvv" />
          <button onClick={handlePurchase}>Purchase</button>
          {purchaseSuccess && (
            <p>
              Success! Your order has been placed. Order number: {orderNumber}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Checkout;
