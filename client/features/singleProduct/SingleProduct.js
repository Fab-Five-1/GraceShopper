import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct, selectSingleProduct } from "./singleProductSlice";


const SingleProduct = () => {
    const { productId } = useParams();
    const singleProduct = useSelector(selectSingleProduct);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchSingleProduct(productId));
    }, [])

    return (
        <div>
            <p>testing</p>
        </div>
    )

}

export default SingleProduct; 