import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const GUEST = "guest";

export const fetchUsersCart = createAsyncThunk("cart", async (id) => {
  try {
    const { data } = await axios.get(`/api/cart/${id}`);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
});

export const updateOrderProducts = createAsyncThunk(
  "updateOrderProducts",
  async (orderProduct) => {
    try {
      const { data } = await axios.put("/api/cart", { orderProduct });
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);

export const deleteOrderProduct = createAsyncThunk(
  "deleteOrderProduct",
  async (id) => {
    try {
      const { data } = await axios.delete(`/api/cart/${id}`);
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);

export const setTotalPrice = createAsyncThunk(
  "setTotalPrice",
  async ({ total, id }) => {
    try {
      const { data } = await axios.put(`/api/cart/${id}`, { total });
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);

export const createOrder = createAsyncThunk(
  "createOrder",
  async ({ userId, productId }) => {
    try {
      const { data } = await axios.put(`/api/products/${productId}`, {
        userId,
      });
      if (data.newGuest) {
        window.localStorage.setItem(GUEST, data.newGuest.id);
      }
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    user: [],
    orders: [],
    orderProducts: [],
    products: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsersCart.fulfilled, (state, action) => {
      const { user, orders, orderProducts, products } = action.payload;
      state.user = user;
      state.orders = orders;
      state.orderProducts = orderProducts;
      state.products = products;
    });
    builder.addCase(updateOrderProducts.fulfilled, (state, action) => {
      state.orderProducts = action.payload;
    });
    builder.addCase(deleteOrderProduct.fulfilled, (state, action) => {
      const { orderProducts, products } = action.payload;
      state.orderProducts = orderProducts;
      state.products = products;
    });
    builder.addCase(setTotalPrice.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
  },
});

export const selectCart = (state) => {
  return state.cartSlice;
};

export default cartSlice.reducer;
