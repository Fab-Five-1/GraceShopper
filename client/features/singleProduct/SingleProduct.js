import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct, selectSingleProduct } from "./singleProductSlice";


const SingleProduct = () => {
    const { productId } = useParams();
    const singleProduct = useSelector(selectSingleProduct);
    const dispatch = useDispatch()
    const { name, description, price, quantity, imageUrl } = singleProduct;

    // hard coded productId - need to edit in later
    useEffect(() => {
        dispatch(fetchSingleProduct(2));
    }, [])

    return (
        <div id="singleProductContainer">
            {/* <h1>Name</h1>
            <p>Description</p> */}
            <h1>{name}</h1>
            <p>{description}</p>
            <p>${price}</p>
            {/* <p>{quantity}</p> */}
            <p>{imageUrl}</p>
        </div>
    )

}

export default SingleProduct; 