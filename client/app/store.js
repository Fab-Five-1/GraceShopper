import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import singleProductSlice from "../features/singleProduct/singleProductSlice";
import AddUserSlice from '../features/users/AddUserSlice';
import allProductsSlice from "../features/allProducts/allProductsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    singleProduct: singleProductSlice,
    addUser: AddUserSlice,
    allProducts: allProductsSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
