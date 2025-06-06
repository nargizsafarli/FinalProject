import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("wishlistItems")) || [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload;
      const exists = state.items.find((item) => item.id === product.id);

      if (!exists) {
        state.items.push(product);
        localStorage.setItem("wishlistItems", JSON.stringify(state.items));
      }
    },

    removeFromWishlist: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.id !== productId);
      localStorage.setItem("wishlistItems", JSON.stringify(state.items));
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
//   toggleWishlistItem,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
