import React from "react";

import AllProducts from "../allProducts/AllProducts";
import AddProduct from "../allProducts/AddProduct";

import Navbar from "../navbar/Navbar";

/**
 * COMPONENT
 */
const Home = () => {
  return (
    <>
      <div id="homeContainer">
        <div id="homeImg"></div>
        <h2 id="homeSlogan">If it's good for your grandad...</h2>
        <h2 id="homeSlogan2">it's good enough for you</h2>
      </div>
    </>
  );
};

export default Home;
