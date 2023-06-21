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
  const { order, products, orderProducts } = useSelector(selectOrders);

  useEffect(() => {
    dispatch(getOrder(id));
  }, [dispatch, id]);
  return (
    <div className="items">
      <Link style={{ marginLeft: "20px" }} to={`/orders/`}>
        <button>Back</button>
      </Link>
      {products.map((product) => {
        const orderProduct = orderProducts.find(
          (op) => op.productId === product.id
        );
        const productTotal = (orderProduct.numberOfItems * product.price) / 100;

        return (
          <div key={product.id} className="oneItem">
            <Link style={{ marginRight: "7px" }} to={`/products/${product.id}`}>
              <img
                className="cartImg"
                src={product.imageUrl}
                alt={product.name}
              />
            </Link>
            <span className="cartSpan ">Name: {product.name}</span>
            <span className="cartSpan ">
              Total: {orderProduct.numberOfItems}
            </span>
            <span className="cartSpan ">Total Price: ${productTotal}</span>
          </div>
        );
      })}
    </div>
  );
};

export default SingleOrder;
