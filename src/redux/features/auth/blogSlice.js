import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { supabase } from '../../../client';


export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  const { data, error } = await supabase.from("Blog").select("*");
  if (error) throw error;
  return data;
});

const blogSlices = createSlice({
  name: "blogs",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default blogSlices.reducer;
