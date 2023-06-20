import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, selectOrders } from "./OrderSlice";

/**
 * COMPONENT
 */
const order = () => {
  let userId = useSelector((state) => state.auth.me.id);
  const dispatch = useDispatch();
  const { orders, products, orderProducts } = useSelector(selectOrders);

  console.log(orders);

  useEffect(() => {
    dispatch(getAllOrders(userId));
  }, [dispatch]);

  return <h1>HELLO YOU DID IT!</h1>;
};

export default order;
