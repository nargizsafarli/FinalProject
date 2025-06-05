import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/auth/productSlice"
import basketReducer from "./features/auth/basketSlice"
import wishlistReducer from "./features/auth/wishlistSlice"

export const store=configureStore({
    reducer:{
        product:productReducer,
        basket:basketReducer,
        wishlist:wishlistReducer
    }
})