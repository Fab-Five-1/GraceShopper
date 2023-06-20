import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllOrders = createAsyncThunk("getAllOrders", async (id) => {
  try {
    const { data } = await axios.get(`/api/orders`);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
});

const orderSlice = createSlice({
  name: "orderSlice",
  initialState: {
    order: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllOrders.fulfilled, (state, action) => {
      state.order = action.payload;
    });
  },
});

export const selectOrders = (state) => {
  return state.orderSlice;
};

export default orderSlice.reducer;
