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
        <NavLink to={`/products/${product.id}`} className="product">
          <div className="product">
            <img className="productImg" src={product.imageUrl} alt={product.name} />

            <div className="productInfo">
              <h3>
                {product.name}
              </h3>
              <h3>
                ${product.price / 100}
              </h3>
            </div>
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
