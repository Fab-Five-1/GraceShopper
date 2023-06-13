import React, { useEffect } from "react";
import { selectSingleProduct } from "./SingleProduct";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "./SingleProduct";


const singleProduct = () => {
    const { productId } = useParams();
    const singleProduct = useSelector(selectSingleProduct);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchSingleProduct(productId));
    })

    return(
        <div>

        </div>
    )

}

export default singleProduct; 