import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/auth/productSlice"
import basketReducer from "./features/auth/basketSlice"
import wishlistReducer from "./features/auth/wishlistSlice"
import authReducer from "./features/auth/authSlice"
import blogReducer from "./features/auth/blogSlice"
import faqReducer from "./features/auth/faqSlice"

export const store=configureStore({
    reducer:{
        product:productReducer,
        basket:basketReducer,
        wishlist:wishlistReducer,
        auth:authReducer,
        blog:blogReducer,
        faq:faqReducer
    }
})