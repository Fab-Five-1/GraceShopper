import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editProductAsync } from "./singleProductSlice";
import { useParams } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  // const productId = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const bool = false;
    const finalPrice = price * 100;
    dispatch(
      editProductAsync({
        name,
        description,
        // price,
        price: finalPrice,
        quantity,
        category,
        imageUrl,
        id,
        bool,
      })
    );
    setName("");
    setDescription("");
    setPrice("");
    setQuantity("");
    setCategory("");
    setImageUrl("");
    setShowSuccessMessage(true);
  };

  if (showSuccessMessage) {
    return <p className="successMessage">Product edited Successfully!</p>;
  }

  return (
    <div className="addProduct">
      <form className="formContainer" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          className="inputField"
          type="text"
          name="name"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
        />

        <label htmlFor="description">Description</label>
        <input
          className="inputField"
          type="text"
          name="description"
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />

        <label htmlFor="price">Price</label>
        <input
          className="inputField"
          type="number"
          name="price"
          value={price}
          onChange={(ev) => setPrice(parseInt(ev.target.value))}
        />

        <label htmlFor="quantity">Quantity</label>
        <input
          className="inputField"
          type="number"
          name="quantity"
          value={quantity}
          onChange={(ev) => setQuantity(parseInt(ev.target.value))}
        />

        <label htmlFor="category">Category</label>
        <input
          className="inputField"
          type="text"
          name="category"
          value={category}
          onChange={(ev) => setCategory(ev.target.value)}
        />

        <label htmlFor="imageUrl">Image Url</label>
        <input
          className="inputField"
          type="text"
          name="imageUrl"
          value={imageUrl}
          onChange={(ev) => setImageUrl(ev.target.value)}
        />
        <br></br>
        <button className="submitButton" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
