import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchUsersCart,
  selectCart,
  updateOrderProducts,
  deleteOrderProduct,
  setTotalPrice,
} from "./CartSlice";

const Cart = () => {
  let userId = useSelector((state) => state.auth.me.id);
  if (!userId) {
    userId = window.localStorage.guest;
  }
  const firstName = useSelector((state) => state.auth.me.firstName);
  const dispatch = useDispatch();
  const { orders, products, orderProducts } = useSelector(selectCart);

  let orderId;
  if (Array.isArray(orders)) {
    orderId = orders.map((info) => info.total);
  } else if (orders && typeof orders === "object") {
    orderId = orders.id;
  }

  useEffect(() => {
    dispatch(fetchUsersCart(userId));
  }, [dispatch, fetchUsersCart]);

  const handleQuantityChange = (event, orderProductId) => {
    const newQuantity = parseInt(event.target.value);
    const newOrderProducts = orderProducts.map((orderProduct) =>
      orderProduct.id === orderProductId
        ? { ...orderProduct, numberOfItems: newQuantity }
        : orderProduct
    );
    dispatch(updateOrderProducts(newOrderProducts));
  };

  const calculateTotal = () => {
    return products.reduce((total, product) => {
      const orderProduct = orderProducts.find(
        (op) => op.productId === product.id
      );
      const productTotal = (orderProduct.numberOfItems * product.price) / 100;
      return total + productTotal;
    }, 0);
  };

  const handleDelete = async (id) => {
    await dispatch(deleteOrderProduct(id));
    dispatch(fetchUsersCart());
  };

  const handleCheckout = async (total, id) => {
    console.log("HELLO", total);
    dispatch(setTotalPrice({ total, id }));
  };

  return (
    <div id="cart">
      <div id="loginCart">
        {firstName ? (
          <h1 style={{ borderBottom: "5px solid black" }}>
            Welcome to your cart, {firstName} 😎
          </h1>
        ) : (
          <h1 style={{ borderBottom: "5px solid black" }}>
            Welcome to your cart 😎
          </h1>
        )}
        <section>
          {orderProducts.length > 0 ? (
            <div>
              {products.map((product) => {
                const orderProduct = orderProducts.find(
                  (op) => op.productId === product.id
                );
                const productTotal =
                  (orderProduct.numberOfItems * product.price) / 100;

                return (
                  <div
                    key={product.id}
                    style={{
                      display: "inline-block",
                      borderBottom: "5px solid rgba(0, 0, 0, 0.53)",
                      padding: "20px",
                    }}
                  >
                    <input
                      style={{
                        margin: "0px 5px",
                        width: "30px",
                        fontSize: "25px",
                      }}
                      type="number"
                      value={orderProduct.numberOfItems}
                      min={1}
                      onChange={(event) =>
                        handleQuantityChange(event, orderProduct.id)
                      }
                    />
                    <span className="neon">{product.name}</span>
                    <Link
                      style={{ marginRight: "7px" }}
                      to={`/products/${product.id}`}
                    >
                      <img
                        src={product.imageUrl}
                        width="70px"
                        style={{ border: "4px solid black" }}
                        alt={product.name}
                      />
                    </Link>
                    <span style={{ margin: "15px", fontSize: "25px" }}>
                      ${productTotal}
                    </span>
                    <button
                      style={{ fontSize: "20px" }}
                      type="button"
                      onClick={() => handleDelete(orderProduct.id)}
                    >
                      x
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <h2>Cart is empty</h2>
          )}
        </section>
        <h3 style={{ fontSize: "25px" }}>Total: ${calculateTotal()}</h3>
        <h3 style={{ fontSize: "25px" }}>Ready to checkout?</h3>
        <Link to="/checkout">
          <button
            style={{ fontSize: "20px" }}
            type="button"
            onClick={() => handleCheckout(calculateTotal(), orderId[0])}
          >
            Checkout
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
