import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, selectOrders } from "./OrderSlice";
import { Link } from "react-router-dom";

/**
 * COMPONENT
 */
const Order = () => {
  let userId = useSelector((state) => state.auth.me.id);
  const dispatch = useDispatch();
  const { orders } = useSelector(selectOrders);

  useEffect(() => {
    dispatch(getAllOrders(userId));
  }, [dispatch, userId]);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Here are your orders...</h1>
      {orders[0] ? (
        <div>
          {orders.map((order) => {
            return (
              <Link key={order.id} to={`/orders/${order.id}`}>
                <div key={order.id}>
                  <h2>Order ID: {order.id}</h2>
                  <h3>Total: ${order.total}</h3>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <>
          <h2>You seem to have never placed an order</h2>
          <p>Back to products?</p>
          <Link to="/home">
            <button style={{ fontSize: "25px" }} type="button">
              Shop
            </button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Order;
