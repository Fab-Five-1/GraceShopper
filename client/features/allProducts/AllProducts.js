import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import SingleProduct from "../singleProduct/SingleProduct";

const AllProducts = () => {
  const products = useSelector((state) => state.products);

  const renderProducts = () => {
    return products.map((product) => (
      <div className="product" key={`All Products ${product.id}`}>
        <NavLink to={`/product/${product.id}`} className="product">
          <div className="product">
            <h3>
              {product.name} {product.price}
            </h3>
            <img src={product.imageUrl} alt={product.name} />
          </div>
        </NavLink>
      </div>
    ));
  };

  return (
    <div id="products" className="column">
      {products && products.length ? (
        renderProducts()
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default AllProducts;
