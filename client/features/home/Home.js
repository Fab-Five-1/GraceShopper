import React from "react";
import { useSelector } from "react-redux";
import SingleProduct from "../singleProduct/SingleProduct"

import AllProducts from "../allProducts/AllProducts";
import AddProduct from "../allProducts/AddProduct";

/**
 * COMPONENT
 */
const Home = (props) => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const username = useSelector((state) => state.auth.me.username);

  return (
    <>
      <div>{isLoggedIn ? <h3>Welcome, {username}</h3> : <h3>Welcome!</h3>}</div>
      <AllProducts />
      <AddProduct />
    </>
  );
};

export default Home;
