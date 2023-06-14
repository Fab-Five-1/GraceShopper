import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import singleProductSlice from "../features/singleProduct/singleProductSlice";
import cartSlice from "../features/cart/CartSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    singleProduct: singleProductSlice,
    cartSlice: cartSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
