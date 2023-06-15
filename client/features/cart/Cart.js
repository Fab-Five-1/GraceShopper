import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUsersCart, selectCart, updateOrderProducts } from "./CartSlice";

const Cart = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const firstName = useSelector((state) => state.auth.me.firstName);
  const dispatch = useDispatch();
  const { products, orderProducts } = useSelector(selectCart);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchUsersCart());
    }
  }, [dispatch, fetchUsersCart, isLoggedIn]);

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
        (op) => op.id === product.orderProductId
      );
      const productTotal = (orderProduct.numberOfItems * product.price) / 100;
      return total + productTotal;
    }, 0);
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h1>Welcome to your cart, {firstName}!</h1>
          <section style={{ border: "5px solid red" }}>
            {products.length > 0 ? (
              <div>
                <h2>Items:</h2>
                <div>
                  {products.map((product) => {
                    const orderProduct = orderProducts.find(
                      (op) => op.id === product.orderProductId
                    );
                    const productTotal =
                      (orderProduct.numberOfItems * product.price) / 100;

                    return (
                      <div key={product.id}>
                        <input
                          style={{ margin: "0px 5px", width: "30px" }}
                          type="number"
                          value={orderProduct.numberOfItems}
                          min={1}
                          onChange={(event) =>
                            handleQuantityChange(event, orderProduct.id)
                          }
                        />
                        <span style={{ marginRight: "5px" }}>
                          {product.name}
                        </span>
                        <span style={{ marginRight: "5px" }}>
                          ${productTotal}
                        </span>
                        <Link to={`/products/${product.id}`}>
                          <img
                            src={product.imageUrl}
                            width="50px"
                            style={{ border: "3px solid black" }}
                            alt={product.name}
                          />
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <h2>Cart is empty</h2>
            )}
          </section>
          <h3>Total: ${calculateTotal()}</h3>
          <h3>Ready to checkout?</h3>
          <Link to="/checkout">
            <button type="button">Checkout</button>
          </Link>
        </div>
      ) : (
        <div>
          <h1>Hi, you're not signed in!</h1>
          <h3>Would you like to login or sign up?</h3>
          <Link to="/login">Login</Link>
          <br />
          <Link to="/signup">Sign Up</Link>
          <h3>Or continue as a guest</h3>
          <Link to="/guestcheckout">Continue</Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
