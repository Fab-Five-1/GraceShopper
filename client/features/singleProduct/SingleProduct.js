import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductAsync,
  editProductAsync,
  fetchSingleProduct,
  selectSingleProduct,
} from "./singleProductSlice";
import { createOrder } from "../cart/CartSlice";
import EditProduct from "./EditProduct";

const SingleProduct = () => {
  const productId = useParams();
  const singleProduct = useSelector(selectSingleProduct);
  const dispatch = useDispatch();
  const { name, description, price, quantity, imageUrl, id } = singleProduct;

  const [count, setCount] = useState(1);

  let userId = useSelector((state) => state.auth.me.id);
  if (!userId) {
    userId = window.localStorage.guest;
  }
  const isAdmin = useSelector((state) => state.auth.me.isAdmin);

  useEffect(() => {
    dispatch(fetchSingleProduct(productId.id));
  }, []);

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleCartCreate = async (userId, productId, count) => {
    dispatch(createOrder({ userId, productId, count }));
  };

  const navigate = useNavigate();

  const handleDelete = async (productId) => {
    await dispatch(deleteProductAsync(productId));
    navigate("/products");
  };

  const handleEdit = async (productId) => {
    await dispatch(editProductAsync(productId));
  };

  const [popUp, setPopup] = useState(false);
  const handleClickOpen = () => {
    setPopup(!popUp);
  };

  const closePopup = () => {
    setPopup(false);
  };

  if (isAdmin) {
    return (
      <div id="singleProductContainer">
        <div id="singleProdText">
          <h1>{name}</h1>
          <p>{description}</p>
          <p>${price / 100}</p>
          <button className="countBtn" onClick={handleDecrement}>
            -
          </button>
          <span className="countSpace">{count}</span>
          <button className="countBtn" onClick={handleIncrement}>
            +
          </button>
          <button
            className="buttonSpace"
            onClick={() => handleCartCreate(userId, id, count)}
          >
            Add to Cart
          </button>
          <br></br>
          <div className="singleBreak">
            {/* <button onClick={() => handleEdit(id)}>Edit Product</button> */}
            <button onClick={handleClickOpen}>Edit Product</button>
            <div className="addNewPopup">
              {popUp ? (
                <div>
                  <div className="popupHead">
                    <h3>Edit A Product</h3>
                    <button id="X" onClick={closePopup}>
                      X
                    </button>
                  </div>
                  <EditProduct />
                </div>
              ) : (
                ""
              )}
            </div>
            <button onClick={() => handleDelete(id)}>Delete Product</button>
          </div>
        </div>
        <div>
          <img className="productImg" src={imageUrl} />
        </div>
      </div>
    );
  } else {
    return (
      <div id="singleProductContainer">
        <div id="singleProdText">
          <h1>{name}</h1>
          <p>{description}</p>
          <p>${price / 100}</p>
          <button className="countBtn" onClick={handleDecrement}>
            -
          </button>
          <span className="countSpace">{count}</span>
          <button className="countBtn" onClick={handleIncrement}>
            +
          </button>
          <button
            className="buttonSpace"
            onClick={() => handleCartCreate(userId, id, count)}
          >
            Add to Cart
          </button>
        </div>
        <div>
          <img className="productImg" src={imageUrl} />
        </div>
      </div>
    );
  }
};

export default SingleProduct;
