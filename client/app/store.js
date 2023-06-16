import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import singleProductSlice from "../features/singleProduct/singleProductSlice";
import cartSlice from "../features/cart/CartSlice";
import AddUserSlice from "../features/users/AddUserSlice";
import allProductsSlice from "../features/allProducts/allProductsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    singleProduct: singleProductSlice,
    cartSlice: cartSlice,
    addUser: AddUserSlice,
    allProducts: allProductsSlice,
    
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
