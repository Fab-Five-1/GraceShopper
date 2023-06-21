import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllOrders = createAsyncThunk("getAllOrders", async (id) => {
  try {
    const { data } = await axios.get(`/api/orders?id=${id}`);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
});

export const getOrder = createAsyncThunk("getOrder", async (id) => {
  try {
    const { data } = await axios.get(`/api/orders/${id}`);
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
    order: [],
    orderProducts: [],
    products: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllOrders.fulfilled, (state, action) => {
      const { user, orders } = action.payload;
      state.user = user;
      state.orders = orders;
    });
    builder.addCase(getOrder.fulfilled, (state, action) => {
      const { user, orders, orderProducts, products } = action.payload;
      state.user = user;
      state.order = orders;
      state.orderProducts = orderProducts;
      state.products = products;
    });
  },
});

export const selectOrders = (state) => {
  return state.orderSlice;
};

export default orderSlice.reducer;
