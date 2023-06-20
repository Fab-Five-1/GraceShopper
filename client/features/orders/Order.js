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
  const { orders, products, orderProducts } = useSelector(selectOrders);

  const getProductPrice = (productId) => {
    const product = products.find((p) => p.id === productId);
    return product ? product.price : 0;
  };

  useEffect(() => {
    dispatch(getAllOrders(userId));
  }, [dispatch, userId]);

  const mappedOrders = orders.map((order) => {
    console.log(orders);
    const orderedProducts = orderProducts;

    return {
      id: order.id,
      products: orderedProducts,
      total: order.total,
    };
  });

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Here are your orders...</h1>
      {mappedOrders.length > 0 ? (
        <div>
          {mappedOrders.map((mappedOrder) => (
            <div key={mappedOrder.id}>
              <h2>Order ID: {mappedOrder.id}</h2>
              {mappedOrder.products.map((orderProduct) => {
                const product = products.find(
                  (p) => p.id === orderProduct.productId
                );
                const productTotal = (
                  orderProduct.numberOfItems *
                  getProductPrice(orderProduct.productId)
                ).toFixed(2);

                return (
                  <div key={orderProduct.productId} className="oneItem">
                    <img
                      className="cartImg"
                      src={product.imageUrl}
                      alt={product.name}
                    />
                    <span className="cartSpan">Item: {product.name}</span>
                    <span className="cartSpan">
                      Quantity: {orderProduct.numberOfItems}
                    </span>
                    <span className="cartSpan">Total: ${productTotal}</span>
                  </div>
                );
              })}
              <div className="orderTotal">
                <h3>Total: ${mappedOrder.total.toFixed(2)}</h3>
              </div>
            </div>
          ))}
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
