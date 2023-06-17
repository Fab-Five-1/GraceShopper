import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
};

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

export const addProductAsync = createAsyncThunk("products/addProduct", async ({ name, description, price, quantity, category, imageUrl }) => {
  const { data } = await axios.post("/api/products", {
    name,
    description,
    price,
    quantity,
    category,
    imageUrl
  });
  return data
})

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(addProductAsync.fulfilled, (state, action) => {
      state.data.push(action.payload)
    })
  },
});

export const selectProducts = (state) => {
  return state.allProducts.data;
};

export default productsSlice.reducer;
