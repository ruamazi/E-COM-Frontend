import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL, sendTokenHeader } from "../../constants";

export const getMyOrders = createAsyncThunk(
 "order/getMyOrders",
 async (_, { rejectWithValue }) => {
  try {
   const response = await axios.get(
    `${API_URL}/api/orders/my-orders`,
    sendTokenHeader
   );
   return response.data;
  } catch (error) {
   console.log(error);
   return rejectWithValue(error.response.data);
  }
 }
);

export const getOrderById = createAsyncThunk(
 "order/getOrderById",
 async (orderId, { rejectWithValue }) => {
  try {
   const response = await axios.get(
    `${API_URL}/api/orders/single-order/${orderId}`,
    sendTokenHeader
   );
   return response.data;
  } catch (error) {
   return rejectWithValue(error.response.data);
  }
 }
);

export const deleteOrder = createAsyncThunk(
 "order/deleteOrder",
 async (orderId, { rejectWithValue }) => {
  try {
   await axios.delete(
    `${API_URL}/api/orders/delete-order/${orderId}`,
    sendTokenHeader
   );
   return orderId;
  } catch (error) {
   return rejectWithValue(error.response.data);
  }
 }
);

const initialState = {
 orders: [],
 orderDetails: null,
 loading: false,
 error: null,
};

const orderSlice = createSlice({
 name: "order",
 initialState,
 reducers: {},
 extraReducers: (builder) => {
  builder
   // handle get my orders
   .addCase(getMyOrders.pending, (state) => {
    state.loading = true;
    state.error = null;
   })
   .addCase(getMyOrders.fulfilled, (state, action) => {
    state.loading = false;
    state.orders = action.payload;
   })
   .addCase(getMyOrders.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload.error || "Failed to fetch orders";
   })
   // handle get order by id
   .addCase(getOrderById.pending, (state) => {
    state.loading = true;
    state.error = null;
   })
   .addCase(getOrderById.fulfilled, (state, action) => {
    state.loading = false;
    state.orderDetails = action.payload;
   })
   .addCase(getOrderById.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload.error || "Failed to fetch order";
   })
   // handle delete order
   .addCase(deleteOrder.pending, (state) => {
    state.loading = true;
    state.error = null;
   })
   .addCase(deleteOrder.fulfilled, (state, action) => {
    state.loading = false;
    state.orders = state.orders.filter((order) => order._id !== action.payload);
   })
   .addCase(deleteOrder.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload.error || "Failed to delete order";
   });
 },
});

export default orderSlice.reducer;
