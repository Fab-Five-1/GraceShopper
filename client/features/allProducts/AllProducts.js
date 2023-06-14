import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
//import SingleProduct from "../singleProduct/SingleProduct";
import { selectProducts } from "./allProductsSlice";
import { fetchProductsAsync } from "./allProductsSlice";

const AllProducts = () => {
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);

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
        <div>
          {console.log(products)}
          <p>No products found.</p>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
