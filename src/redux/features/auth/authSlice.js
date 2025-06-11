import { supabase } from "../../../client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// 🔸 Register thunk
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ name, surname, email, password }, thunkAPI) => {
    try {
      // 1. Supabase auth ilə qeydiyyat
      const { data, error } = await supabase.auth.signUp({ email, password });

      if (error) throw new Error(error.message);

      const user = data.user || data.session?.user;
      if (!user) throw new Error("İstifadəçi məlumatı alınmadı.");

      // 2. Əlavə məlumatları "profils" cədvəlinə yaz
      const { error: dbError } = await supabase.from("profils").insert([
        {
          id: user.id,
          name,
          surname,
        },
      ]);

      if (dbError) throw new Error(dbError.message);

      const userData = {
        id: user.id,
        email: user.email,
        name,
        surname,
      };

      localStorage.setItem("user", JSON.stringify(userData));

      return userData;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// 🔸 Login thunk
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw new Error(error.message);

      const user = data.user;
      if (!user) throw new Error("İstifadəçi tapılmadı");

      // `profils` cədvəlindən əlavə məlumatları çək
      const { data: profileData, error: profileError } = await supabase
        .from("profils")
        .select("*")
        .eq("id", user.id)
        .single(); // yalnız bir nəticə gözləyirik

      if (profileError) throw new Error(profileError.message);

      const userData = {
        id: user.id,
        email: user.email,
        name: profileData.name,
        surname: profileData.surname,
      };

      localStorage.setItem("user", JSON.stringify(userData));

      return userData;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// 🔸 Logout thunk
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await supabase.auth.signOut();
  localStorage.removeItem("user"); // çıxarırıq
});

// 🔹 LocalStorage-dan ilkin dəyəri oxu
const storedUser = localStorage.getItem("user");

// 🔹 Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: storedUser ? JSON.parse(storedUser) : null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 🔸 REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔸 LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔸 LOGOUT
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;
