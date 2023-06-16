import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct, selectSingleProduct } from "./singleProductSlice";
import { createOrder } from "../cart/CartSlice";

const SingleProduct = () => {
    const productId = useParams();
    const singleProduct = useSelector(selectSingleProduct);
    const dispatch = useDispatch();
    const { name, description, price, quantity, imageUrl, id } = singleProduct;

    const [count, setCount] = useState(1);

    const userId = useSelector((state) => state.auth.me.id);
    const isAdmin = useSelector((state) => state.auth.me.isAdmin);

    useEffect(() => {
        dispatch(fetchSingleProduct(productId.id));
    }, []);

    const handleDecrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };

    const handleIncrement = () => {
        setCount(count + 1);
    };

    const handleCartCreate = async (userId, productId) => {
        dispatch(createOrder({ userId, productId }));
    };

    // if statement for if admin if true

    if (isAdmin) {
        return (
            <div id="singleProductContainer">
                <p>ADMIN VIEW</p>
                <div id="singleProdText">
                    <h1>{name}</h1>
                    <p>{description}</p>
                    <p>${price / 100}</p>
                    <button>Edit Product</button>
                    <button>Delete Product</button>
                </div>
                <div>
                    <img src={imageUrl} />
                </div>
                {/* <button onClick={() => handleCartCreate(userId, id)}>
          Add to Cart
        </button> */}
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
                        onClick={() => handleCartCreate(userId, id)}
                    >
                        Add to Cart
                    </button>
                </div>
                <div>
                    <img src={imageUrl} />
                </div>
            </div>
        );
    }
};

export default SingleProduct;
