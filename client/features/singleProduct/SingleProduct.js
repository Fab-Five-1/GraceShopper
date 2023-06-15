import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct, selectSingleProduct } from "./singleProductSlice";



const SingleProduct = () => {
    const productId = useParams();
    const singleProduct = useSelector(selectSingleProduct);
    const dispatch = useDispatch()
    const { name, description, price, quantity, imageUrl } = singleProduct;

    const [count, setCount] = useState(1);

    const isAdmin = useSelector((state) => state.auth.me.isAdmin);

    useEffect(() => {
        dispatch(fetchSingleProduct(productId.id));
    }, [])

    const handleDecrement = () => {
        if (count > 0) {
            setCount(count - 1)
        }
    }

    const handleIncrement = () => {
        setCount(count + 1)
    }

    // if statement for if admin if true
    return (
        <div id="singleProductContainer">
            <div id="singleProdText">
                <h1>{name}</h1>
                <p>{description}</p>
                <p>${price / 100}</p>
                <button className="countBtn" onClick={handleDecrement}>-</button>
                <span className="countSpace">{count}</span>
                <button className="countBtn" onClick={handleIncrement}>+</button>
                <button className="buttonSpace">Add to Cart</button>
            </div>
            <div>
                <img src={imageUrl} />
            </div>
        </div>
    )

}

export default SingleProduct; 