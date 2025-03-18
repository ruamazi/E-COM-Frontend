import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constants";

const userFormStorage = localStorage.getItem("userInfo")
 ? JSON.parse(localStorage.getItem("userInfo"))
 : null;

const initialGuestId =
 localStorage.getItem("guestId") || `guest_${new Date().getTime()}`;
localStorage.setItem("guestId", initialGuestId);

const initialState = {
 user: userFormStorage,
 guestId: initialGuestId,
 loading: false,
 error: null,
};

export const loginUser = createAsyncThunk(
 "auth/loginUser",
 async (userData, { rejectWithValue }) => {
  try {
   const response = await axios.post(`${API_URL}/api/users/login`, userData);
   localStorage.setItem("userInfo", JSON.stringify(response.data.user));
   localStorage.setItem("userToken", response.data.token);
   return response.data.user;
  } catch (error) {
   return rejectWithValue(error.response.data);
  }
 }
);

export const registerUser = createAsyncThunk(
 "auth/registerUser",
 async (userData, { rejectWithValue }) => {
  try {
   const response = await axios.post(`${API_URL}/api/users/register`, userData);
   localStorage.setItem("userInfo", JSON.stringify(response.data.user));
   localStorage.setItem("userToken", response.data.token);
   return response.data.user;
  } catch (error) {
   return rejectWithValue(error.response.data.error);
  }
 }
);

const authSlice = createSlice({
 name: "auth",
 initialState,
 reducers: {
  logout: (state) => {
   localStorage.removeItem("userInfo");
   localStorage.removeItem("userToken");
   state.user = null;
   state.guestId = `guest_${new Date().getTime()}`;
   localStorage.setItem("guestId", state.guestId);
  },
  generateGuestId: (state) => {
   state.guestId = `guest_${new Date().getTime()}`;
   localStorage.setItem("guestId", state.guestId);
  },
 },
 extraReducers: (builder) => {
  builder
   // handle login
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
    state.error = action.payload.error || "Failed to login";
   })
   // handle register
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
    state.error = action.payload.error || "Failed to register";
   });
 },
});

export const { logout, generateGuestId } = authSlice.actions;

export default authSlice.reducer;
