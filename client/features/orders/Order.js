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
    <div>
      <h1 style={{ textAlign: "center" }}>Here are your orders...</h1>
      {orders[0] ? (
        <div>
          {orders.map((order) => {
            return (
              <div key={order.id}>
                <span>Order ID: {order.id}</span>
                <span>Total: ${order.total}</span>
                <Link to={`/orders/${order.id}`}>
                  <button>FULL ORDER DETAILS</button>
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <h2>You seem to have never placed an order</h2>
          <p>Back to products?</p>
          <Link to="/home">
            <button style={{ fontSize: "25px" }} type="button">
              Shop
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Order;
