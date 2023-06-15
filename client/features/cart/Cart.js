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
  const username = useSelector((state) => state.auth.me.username);

  useEffect(() => {
    dispatch(fetchUsersCart());
  }, []);
  const { user, orders, orderProducts, products } = usersInfo;
  console.log("INFO", user, orders, orderProducts, products);
  console.log("ORDER!!!!!", products);

  const productIds = products.map((product) => product.id);

  console.log("Product IDs", productIds);

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
                      <span style={{ marginRight: "5px" }} key={product.id}>
                        {product.name}
                      </span>
                      <span style={{ marginRight: "5px" }}>{`$ ${
                        product.price / 100
                      }`}</span>
                      <NavLink
                        to={`/product/${product.id}`}
                        className="product"
                      >
                        <img
                          src={product.imageUrl}
                          width={"50px"}
                          style={{ border: "3px solid black" }}
                        />
                      </NavLink>
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
