import React, { useEffect } from "react";
import { selectSingleProduct } from "./SingleProduct";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "./SingleProduct";

const allProduct = () => {
  const { productId } = useParams();
  const allProducts = useSelector(selectAllProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
  });

  return (
    <div>
      <p>testing</p>
    </div>
  );
};

export default allProduct;
