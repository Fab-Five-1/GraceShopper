import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateOrder = createAsyncThunk(
  "updateOrder",
  async (orderData) => {
    try {
      const { orderId, fulfilled } = orderData;
      const id = orderId;
      const { data } = await axios.put(`/api/checkout/${id}`, { fulfilled });
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);

const checkoutSlice = createSlice({
  name: "checkoutSlice",
  initialState: {
    order: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateOrder.fulfilled, (state, action) => {
      state.order = action.payload;
    });
  },
});

export default checkoutSlice.reducer;
