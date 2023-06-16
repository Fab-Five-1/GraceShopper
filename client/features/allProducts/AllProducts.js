import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
//import SingleProduct from "../singleProduct/SingleProduct";
import { selectProducts } from "./allProductsSlice";
import { fetchProductsAsync } from "./allProductsSlice";
import { createOrder } from "../cart/CartSlice";

const AllProducts = () => {
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.me.id);
  const isAdmin = useSelector((state) => state.auth.me.isAdmin);

  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  const handleCartCreate = async (userId, productId) => {
    dispatch(createOrder({ userId, productId }));
  };

  if (isAdmin) {
    const renderProducts = () => {
      return products.map((product) => (
        <div className="product" key={`All Products ${product.id}`}>
          <NavLink to={`/products/${product.id}`} className="product">
            <div className="product">
              <img
                className="productImg"
                src={product.imageUrl}
                alt={product.name}
              />

              <div className="productInfo">
                <h3>{product.name}</h3>
                <h3>${product.price / 100}</h3>
              </div>
            </div>
          </NavLink>
          <button onClick={() => handleCartCreate(userId, product.id)}>
            Add to Cart
          </button>
          <button>Delete Product</button>
          <button>Edit Product</button>
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
  } else {
    const renderProducts = () => {
      return products.map((product) => (
        <div className="product" key={`All Products ${product.id}`}>
          <NavLink to={`/products/${product.id}`} className="product">
            <div className="product">
              <img
                className="productImg"
                src={product.imageUrl}
                alt={product.name}
              />

              <div className="productInfo">
                <h3>{product.name}</h3>
                <h3>${product.price / 100}</h3>
              </div>
            </div>
          </NavLink>
          <button onClick={() => handleCartCreate(userId, product.id)}>
            Add to Cart
          </button>
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
  }
};

export default AllProducts;
