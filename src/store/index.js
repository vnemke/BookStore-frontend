import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth-slice";
import uiSlice from "./ui-slice";
import cartSlice from "./cart-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiSlice,
    cart: cartSlice,
  },
});

export default store;
