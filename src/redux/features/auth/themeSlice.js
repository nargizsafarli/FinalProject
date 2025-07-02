// import { createSlice } from "@reduxjs/toolkit";

// // themeSlice.js içində
// const initialState = {
//   theme: localStorage.getItem("theme") || "light",
// };

// const themeSlice = createSlice({
//   name: "theme",
//   initialState,
//   reducers: {
//     toggleTheme: (state) => {
//       state.theme = state.theme === "light" ? "dark" : "light";
//       localStorage.setItem("theme", state.theme);
//     },
//     setTheme: (state, action) => {
//       state.theme = action.payload;
//       localStorage.setItem("theme", action.payload);
//     },
//   },
// });
// export default themeSlice.reducer;
// redux/features/theme/themeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light", // default dəyər
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
