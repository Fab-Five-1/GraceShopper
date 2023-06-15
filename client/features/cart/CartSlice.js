import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const TOKEN = "token";

export const fetchUsersCart = createAsyncThunk("cart", async () => {
  const token = window.localStorage.getItem(TOKEN);
  try {
    if (token) {
      const { data } = await axios.get("/api/cart", {
        headers: {
          authorization: token,
        },
      });
      const { user, orders, orderProducts, products } = data;
      console.log("LOG", user, orders, orderProducts, products);
      return data;
    } else {
      return {};
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
});

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    user: null,
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
  },
});

export const selectCart = (state) => {
  return state.cartSlice;
};

export default cartSlice.reducer;
