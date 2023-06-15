import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct, selectSingleProduct } from "./singleProductSlice";



const SingleProduct = () => {
    const productId = useParams();
    const singleProduct = useSelector(selectSingleProduct);
    const dispatch = useDispatch()
    const { name, description, price, quantity, imageUrl } = singleProduct;

    const isAdmin = useSelector((state) => state.auth.me.isAdmin);

    useEffect(() => {
        dispatch(fetchSingleProduct(productId.id));
    }, [])

    // if statement for if admin if true
    return (
        <div id="singleProductContainer">
            <div id="singleProdText">
                <h1>{name}</h1>
                <p>{description}</p>
                <p>${price / 100}</p>
                <p>Quantity:</p>
                <button>Add to Cart</button>
            </div>
            <div>
                <img src={imageUrl} />
            </div>
        </div>
    )

}

export default SingleProduct; 