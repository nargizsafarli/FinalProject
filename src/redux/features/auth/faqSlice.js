import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../../client";


export const fetchFaqs = createAsyncThunk("faq/fetchFaqs", async () => {
  const { data, error } = await supabase.from("faq").select("*");
  if (error) throw new Error(error.message);
  return data;
});

const faqSlice = createSlice({
  name: "faq",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFaqs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFaqs.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchFaqs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default faqSlice.reducer;
