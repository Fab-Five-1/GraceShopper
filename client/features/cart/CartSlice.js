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
    userInfo: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsersCart.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectCart = (state) => {
  return state.cartSlice;
};

export default cartSlice.reducer;
