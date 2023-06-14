import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

export const fetchProductsAsync = createAsyncThunk(
  "products/fetchProductsAsync",
  async () => {
    try {
      const { data } = await axios.get(`/api/products`);
      //   console.log("Were inside of redux state", data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      state = action.payload;
    });
  },
});

export const selectProducts = (state) => {
  return state.products;
};

export default productsSlice.reducer;
