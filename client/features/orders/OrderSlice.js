import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllOrders = createAsyncThunk("getAllOrders", async (id) => {
  console.log(id);
  try {
    const { data } = await axios.get(`/api/order?id=${id}`);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
});

const orderSlice = createSlice({
  name: "orderSlice",
  initialState: {
    user: [],
    orders: [],
    orderProducts: [],
    products: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllOrders.fulfilled, (state, action) => {
      const { user, orders, orderProducts, products } = action.payload;
      state.user = user;
      state.orders = orders;
      state.orderProducts = orderProducts;
      state.products = products;
    });
  },
});

export const selectOrders = (state) => {
  return state.orderSlice;
};

export default orderSlice.reducer;
