import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AuthForm from "../features/auth/AuthForm";
import Home from "../features/home/Home";
import Cart from "../features/cart/Cart";
import Checkout from "../features/cart/Checkout";
import { me } from "./store";
import AddUser from "../features/users/AddUser";

/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route to="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route to="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route
            path="/login"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/signup"
            element={<AddUser name="signup" displayName="Sign Up" />}
          />
        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;
