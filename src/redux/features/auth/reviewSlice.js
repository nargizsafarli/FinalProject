// redux/reviewSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../../client";


export const submitReview = createAsyncThunk(
  "review/submitReview",
  async ({ product_id, user_id, comment, rating }) => {
    const { data, error } = await supabase.from("review").insert([
      {
        product_id,
        user_id,
        comment,
        rating,
      },
    ]);

    if (error) throw error;
    return data;
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetReviewState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitReview.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(submitReview.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetReviewState } = reviewSlice.actions;
export default reviewSlice.reducer;
