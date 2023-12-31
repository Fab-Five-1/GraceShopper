import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSingleProduct = createAsyncThunk(
  "singleProduct",
  async (productId) => {
    try {
      const { data } = await axios.get(`/api/products/${productId}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteProductAsync = createAsyncThunk(
  "deleteProduct",
  async (productId) => {
    const { data } = await axios.delete(`/api/products/${productId}`);
    return data;
  }
);

export const editProductAsync = createAsyncThunk(
  "editProduct",
  async ({
    name,
    description,
    price,
    quantity,
    category,
    imageUrl,
    id,
    bool,
  }) => {
    console.log(bool);
    const { data } = await axios.put(`/api/products/${id}`, {
      name,
      description,
      price,
      quantity,
      category,
      imageUrl,
      bool,
    });
    console.log(data);
    return data;
  }
);

const initialState = [];

const singleProductSlice = createSlice({
  name: "singleProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(deleteProductAsync.fulfilled, (state, action) => {
      const productId = action.payload.id;
      const newState = { ...state };
      delete newState[productId];
      return newState;
    });
    builder.addCase(editProductAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectSingleProduct = (state) => {
  return state.singleProduct;
};

export default singleProductSlice.reducer;
