import React from "react";
import { useSelector } from "react-redux";
import SingleProduct from "../singleProduct/SingleProduct"

import AllProducts from "../allProducts/AllProducts";
import AddProduct from "../allProducts/AddProduct";

import Navbar from "../navbar/Navbar";

/**
 * COMPONENT
 */
const Home = (props) => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const username = useSelector((state) => state.auth.me.username);

  return (
    <>
      <div id="homeDiv">
      </div>
    </>
  );
};

export default Home;
