import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/auth/productSlice"

export const store=configureStore({
    reducer:{
        product:productReducer,
    }
})