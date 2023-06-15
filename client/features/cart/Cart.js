import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { fetchUsersCart, selectCart } from "./CartSlice";

/**
 * COMPONENT
 */
const Cart = () => {
  const dispatch = useDispatch();
  const usersInfo = useSelector(selectCart);
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const username = useSelector((state) => state.auth.me.name);

  useEffect(() => {
    dispatch(fetchUsersCart());
  }, []);

  const { user, orders, orderProducts, products } = usersInfo;

  const orderProductsQ = orderProducts.map(
    (orderProduct) => orderProduct.numberOfItems
  );

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h1>Welcome to your cart, {username}!</h1>
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
                        value={orderProductsQ[product.orderProductId - 1]}
                      />
                      <span style={{ marginRight: "5px" }}>{product.name}</span>
                      <span style={{ marginRight: "5px" }}>{`$ ${
                        (orderProductsQ[product.orderProductId - 1] *
                          product.price) /
                        100
                      }`}</span>
                      <Link to={`/product/${product.id}`}>
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
