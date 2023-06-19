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

  const orderId = orders.map((info) => info.id);

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
      let results = total + productTotal;
      return results;
    }, 0);
  };

  const handleDelete = async (id) => {
    await dispatch(deleteOrderProduct(id));
    dispatch(fetchUsersCart());
  };

  const handleCheckout = async (total) => {
    const id = orderId[0];
    dispatch(setTotalPrice({ total, id }));
  };

  return (
    <div id="cartHolder">
      {firstName ? (
        <h1 style={{ borderBottom: "5px solid black" }}>
          Welcome to your cart, {firstName} 😎
        </h1>
      ) : (
        <h1 style={{ borderBottom: "5px solid black" }}>
          Welcome to your cart 😎
        </h1>
      )}
      <div id="cart">
        <div id="loginCart">
          <section
            style={{
              padding: "20px",
            }}
          >
            {orderProducts.length > 0 ? (
              <div className="items">
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
                        borderBottom: "2px solid rgba(0, 0, 0, 0.53)",
                        padding: "20px",
                      }}
                    >
                      <Link
                        style={{ marginRight: "7px" }}
                        to={`/products/${product.id}`}
                      >
                        <img
                          className="cartImg"
                          src={product.imageUrl}
                          alt={product.name}
                        />
                      </Link>
                      <span className="cartSpan ">{product.name}</span>
                      <input
                        style={{
                          margin: "0px 5px",
                          width: "40px",
                          fontSize: "35px",
                        }}
                        type="number"
                        value={orderProduct.numberOfItems}
                        min={1}
                        onChange={(event) =>
                          handleQuantityChange(event, orderProduct.id)
                        }
                      />
                      <span className="cartSpan ">Total: ${productTotal}</span>
                      <button
                        id="deleteBtn"
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
              <h2 style={{ margin: "100px" }}>Cart is empty</h2>
            )}
          </section>
          <section id="checkoutCart">
            <label style={{ marginTop: "7px", fontSize: "20px" }}>
              ENTER PROMO CODE
            </label>
            <input
              style={{ marginTop: "15px", padding: "5px" }}
              type="text"
              placeholder="Promo Code"
            ></input>
            <button style={{ padding: "5px" }}>SUBMIT</button>
            <h3 style={{ fontSize: "20px" }}>Discount: $0</h3>
            <h3 style={{ fontSize: "20px" }}>Total: ${calculateTotal()}</h3>
            <h3 style={{ fontSize: "25px" }}>Ready to checkout?</h3>
            <Link to="/checkout">
              <button
                style={{ fontSize: "20px" }}
                type="button"
                onClick={() => handleCheckout(calculateTotal())}
              >
                Checkout
              </button>
            </Link>
          </section>
        </div>
      </div>
      <h1>Thank you 💘</h1>
      <h5>
        Price excludes delivery, Taxes, and shipping which calculated at
        checkout
      </h5>
    </div>
  );
};

export default Cart;
