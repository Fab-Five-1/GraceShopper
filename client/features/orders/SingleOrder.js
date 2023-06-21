import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrder, selectOrders } from "./OrderSlice";
import { Link, useParams } from "react-router-dom";

/**
 * COMPONENT
 */
const SingleOrder = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const data = useSelector(selectOrders);

  console.log(data);

  useEffect(() => {
    dispatch(getOrder(id));
  }, [dispatch, id]);
  return (
    <div>
      <h1>HELLLLOOOO YOU DID IT!!!</h1>
    </div>
  );
};

export default SingleOrder;
