import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUsersCart, selectCart } from "./CartSlice";

/**
 * COMPONENT
 */
const Cart = () => {
  const dispatch = useDispatch();
  const usersInfo = useSelector(selectCart);
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const firstName = useSelector((state) => state.auth.me.firstName);

  useEffect(() => {
    dispatch(fetchUsersCart());
  }, []);

  const { user, orders, orderProducts, products } = usersInfo;

  const orderProductsQuantity = orderProducts.map(
    (orderProduct) => orderProduct.numberOfItems
  );

  const handleQuantityChange = (event, orderProductsId) => {
    const newQuantity = parseInt(event.target.value);
    const updatedOrderPros = orderProducts.map((orderProduct) => {
      if (orderProduct.id === orderProductId) {
        return {
          ...orderProduct,
          numberOfItems: newQuantity,
        };
      }
      return orderProduct;
    });
    dispatch(updateOrderProducts(updatedOrderPros));
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
                  {products.map((product) => (
                    <div key={product.id}>
                      <input
                        style={{ margin: "0px 5px", width: "25px" }}
                        type="number"
                        defaultValue={
                          orderProductsQuantity[product.orderProductId - 1]
                        }
                        onChange={(event) =>
                          handleQuantityChange(event, orderProduct.id)
                        }
                      />
                      <span style={{ marginRight: "5px" }}>{product.name}</span>
                      <span style={{ marginRight: "5px" }}>{`$ ${
                        (orderProductsQuantity[product.orderProductId - 1] *
                          product.price) /
                        100
                      }`}</span>
                      <Link to={`/products/${product.id}`}>
                        <img
                          src={product.imageUrl}
                          width={"50px"}
                          style={{ border: "3px solid black" }}
                        />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <h2>Cart is empty</h2>
            )}
          </section>
          <h3>{`Total: $`}</h3>
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
