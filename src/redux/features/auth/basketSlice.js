import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  items:JSON.parse(localStorage.getItem("basketItems")) || [],
  total: 0,
};
const saveBasketToLocalStorage = (items) => {
  localStorage.setItem("basketItems", JSON.stringify(items));
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const { product, size } = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === product.id && item.size === size
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          id: product.id,
          size,
          quantity: 1,
          product,
        });
      }
       saveBasketToLocalStorage(state.items);
    },

    increaseQuantity: (state, action) => {
      const { id, size } = action.payload;
      const item = state.items.find(
        (item) => item.id === id && item.size === size
      );
      if (item) {
        item.quantity += 1;
      }
    },

    decreaseQuantity: (state, action) => {
      const { id, size } = action.payload;
      const item = state.items.find(
        (item) => item.id === id && item.size === size
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
       saveBasketToLocalStorage(state.items); 
    },

    removeFromBasket: (state, action) => {
      const { id, size } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.id === id && item.size === size)
      );
       saveBasketToLocalStorage(state.items); 
    },

    calculateTotal: (state) => {
      state.total = state.items.reduce((acc, item) => {
        let price = 0;

        if (item.size === "small") {
          price = item.product.smallDisPrice || item.product.smallPrice;
        } else if (item.size === "medium") {
          price = item.product.mediumDisPrice || item.product.mediumPrice;
        } else if (item.size === "large") {
          price = item.product.largeDisPrice || item.product.largePrice;
        }

        return acc + price * item.quantity;
      }, 0);
        saveBasketToLocalStorage(state.items); 
    },
  },

});

export const {
  addToBasket,
  increaseQuantity,
  decreaseQuantity,
  removeFromBasket,
  calculateTotal,
} = basketSlice.actions;

export default basketSlice.reducer;
