import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL, sendTokenHeader } from "../../constants";

export const createCheckout = createAsyncThunk(
 "checkout/createCheckout",
 async (checkoutData, { rejectWithValue }) => {
  try {
   const response = await axios.post(
    `${API_URL}/api/checkout/create`,
    checkoutData,
    sendTokenHeader
   );
   return response.data;
  } catch (error) {
   return rejectWithValue(error.response.data);
  }
 }
);

export const updateCheckout = createAsyncThunk(
 "checkout/updateCheckout",
 async (checkoutData, { rejectWithValue }) => {
  try {
   const response = await axios.put(
    `${API_URL}/api/checkout/update/${checkoutData.id}`,
    checkoutData,
    sendTokenHeader
   );
   return response.data;
  } catch (error) {
   return rejectWithValue(error.response.data);
  }
 }
);

export const finalizeCheckout = createAsyncThunk(
 "checkout/finalizeCheckout",
 async (checkoutId, { rejectWithValue }) => {
  try {
   const response = await axios.get(
    `${API_URL}/api/checkout/finalize/${checkoutId}`,
    sendTokenHeader
   );
   return response.data;
  } catch (error) {
   return rejectWithValue(error.response.data);
  }
 }
);

const initialState = {
 checkout: null,
 loading: false,
 error: null,
};

const checkoutSlice = createSlice({
 name: "checkout",
 initialState,
 reducers: {},
 extraReducers: (builder) => {
  builder
   // create checkout
   .addCase(createCheckout.pending, (state) => {
    state.loading = true;
    state.error = null;
   })
   .addCase(createCheckout.fulfilled, (state, action) => {
    state.loading = false;
    state.checkout = action.payload;
   })
   .addCase(createCheckout.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload?.error || "Failed to create checkout";
   })
   // update checkout
   .addCase(updateCheckout.pending, (state) => {
    state.loading = true;
    state.error = null;
   })
   .addCase(updateCheckout.fulfilled, (state, action) => {
    state.loading = false;
    state.checkout = action.payload;
   })
   .addCase(updateCheckout.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload?.error || "Failed to update checkout";
   })
   // finalize checkout
   .addCase(finalizeCheckout.pending, (state) => {
    state.loading = true;
    state.error = null;
   })
   .addCase(finalizeCheckout.fulfilled, (state, action) => {
    state.loading = false;
    state.checkout = action.payload;
   })
   .addCase(finalizeCheckout.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload?.error || "Failed to finalize checkout";
   });
 },
});

export default checkoutSlice.reducer;
