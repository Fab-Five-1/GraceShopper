import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import singleProductSlice from "../features/singleProduct/singleProductSlice";
import cartSlice from "../features/cart/CartSlice";
import AddUserSlice from "../features/users/AddUserSlice";
import allProductsSlice from "../features/allProducts/allProductsSlice";
import allUsersSlice from "../features/allUsers/allUsersSlice";
import checkoutSlice from "../features/cart/CheckoutSlice";
import orderSlice from "../features/orders/OrderSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    singleProduct: singleProductSlice,
    cartSlice: cartSlice,
    addUser: AddUserSlice,
    allProducts: allProductsSlice,
    allUsers: allUsersSlice,
    checkoutSlice: checkoutSlice,
    orderSlice: orderSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
