import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
//import SingleProduct from "../singleProduct/SingleProduct";
import { selectProducts } from "./allProductsSlice";
import { fetchProductsAsync } from "./allProductsSlice";
import { createOrder } from "../cart/CartSlice";
import AddProduct from "./AddProduct"

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

  const [popUp, setPopup] = useState(false);
  const handleClickOpen = () => {
    setPopup(!popUp)
  }

  const closePopup = () => {
    setPopup(false)
  }

  if (isAdmin) {
    const renderProducts = () => {
      return products.map((product) => (
        <div className="product" key={`All Products ${product.id}`}>
          <NavLink to={`/products/${product.id}`} className="product">

            <div className="productContainer">
              <img
                className="allProductImg"
                src={product.imageUrl}
                alt={product.name}
              />

              <div className="productInfo">
                <h3>{product.name}</h3>
                <h3>${product.price / 100}</h3>
              </div>
            <button id="editProductBtn">Edit Product</button>
            </div>
          </NavLink>
          {/* <button onClick={() => handleCartCreate(userId, product.id)}>
            Add to Cart
          </button> */}
        </div>
      ));
    };

    return (
      <div className="adminAllProd">
        <button id="addNewBtn" onClick={handleClickOpen}>Add New Product</button>
        <div className="addNewPopup">
          {popUp ?
            <div>
              <div className="popupHead">
                <h3>Add A New Product</h3>
                <button id="X" onClick={closePopup}>X</button>
              </div>
              <AddProduct />
            </div>

            : ""}
        </div>
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
      </div>
    );
  } else {
    const renderProducts = () => {
      return products.map((product) => (
        <div className="product" key={`All Products ${product.id}`}>
          <NavLink to={`/products/${product.id}`} className="product">
            <div className="productContainer">
              <img
                className="allProductImg"
                src={product.imageUrl}
                alt={product.name}
              />

              <div className="productInfo">
                <h3>{product.name}</h3>
                <h3>${product.price / 100}</h3>
              </div>
            </div>
          </NavLink>
          {/* <button onClick={() => handleCartCreate(userId, product.id)}>
            Add to Cart
          </button> */}
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
