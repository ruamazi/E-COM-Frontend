import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL, sendTokenHeader, token } from "../../constants";

export const getAllUsers = createAsyncThunk(
 "admin/getAllUsers",
 async (_, { rejectWithValue }) => {
  try {
   const response = await axios.get(
    `${API_URL}/api/admin/users`,
    sendTokenHeader
   );
   return response.data;
  } catch (error) {
   return rejectWithValue(error.response.data);
  }
 }
);

export const createNewUser = createAsyncThunk(
 "admin/createNewUser",
 async (userData, { rejectWithValue }) => {
  try {
   const response = await axios.post(
    `${API_URL}/api/admin/create-user`,
    userData,
    sendTokenHeader
   );
   return response.data;
  } catch (error) {
   return rejectWithValue(error.response.data);
  }
 }
);

export const updateUser = createAsyncThunk(
 "admin/updateUser",
 async ({ id, name, email, role }, { rejectWithValue }) => {
  try {
   const response = await axios.put(
    `${API_URL}/api/admin/update-user/${id}`,
    { name, email, role },
    sendTokenHeader
   );
   return response.data;
  } catch (error) {
   return rejectWithValue(error.response.data);
  }
 }
);

export const deleteUser = createAsyncThunk(
 "admin/deleteUser",
 async (userId, { rejectWithValue }) => {
  try {
   await axios.delete(
    `${API_URL}/api/admin/delete-user/${userId}`,
    sendTokenHeader
   );
   return userId;
  } catch (error) {
   return rejectWithValue(error.response.data);
  }
 }
);

export const getAllProducts = createAsyncThunk(
 "admin/getAllProducts",
 async (_, { rejectWithValue }) => {
  try {
   const response = await axios.get(
    `${API_URL}/api/admin/products`,
    sendTokenHeader
   );
   return response.data;
  } catch (error) {
   return rejectWithValue(error.response.data);
  }
 }
);

export const createProduct = createAsyncThunk(
 "admin/createProduct",
 async (productData, { rejectWithValue }) => {
  try {
   const response = await axios.post(
    `${API_URL}/api/admin/create-product`,
    productData,
    sendTokenHeader
   );
   return response.data;
  } catch (error) {
   return rejectWithValue(error.response.data);
  }
 }
);

export const updateProduct = createAsyncThunk(
 "admin/updateProduct",
 async ({ id, productData }, { rejectWithValue }) => {
  try {
   const response = await axios.put(
    `${API_URL}/api/admin/update-product/${id}`,
    productData,
    sendTokenHeader
   );
   return response.data;
  } catch (error) {
   return rejectWithValue(error.response.data);
  }
 }
);

export const deleteProduct = createAsyncThunk(
 "admin/deleteProduct",
 async (productId, { rejectWithValue }) => {
  try {
   await axios.delete(
    `${API_URL}/api/admin/delete-product/${productId}`,
    sendTokenHeader
   );
   return productId;
  } catch (error) {
   return rejectWithValue(error.response.data);
  }
 }
);

export const getAllOrders = createAsyncThunk(
 "admin/getAllOrders",
 async (_, { rejectWithValue }) => {
  try {
   const response = await axios.get(
    `${API_URL}/api/admin/orders`,
    sendTokenHeader
   );
   return response.data;
  } catch (error) {
   return rejectWithValue(error.response.data);
  }
 }
);

export const updateOrderStatus = createAsyncThunk(
 "admin/updateOrderStatus",
 async ({ id, status }, { rejectWithValue }) => {
  try {
   const response = await axios.put(
    `${API_URL}/api/admin/order-status/${id}`,
    { status },
    sendTokenHeader
   );
   return response.data;
  } catch (error) {
   return rejectWithValue(error.response.data);
  }
 }
);

export const deleteOrder = createAsyncThunk(
 "admin/deleteOrder",
 async (orderId, { rejectWithValue }) => {
  try {
   await axios.delete(
    `${API_URL}/api/admin/delete-order/${orderId}`,
    sendTokenHeader
   );
   return orderId;
  } catch (error) {
   return rejectWithValue(error.response.data);
  }
 }
);

const initialState = {
 users: [],
 products: [],
 orders: [],
 totalOrders: 0,
 totalSales: 0,
 usersLoading: false,
 usersError: null,
 ordersLoading: false,
 ordersError: null,
 productsLoading: false,
 productsError: null,
};

const adminSlice = createSlice({
 name: "admin",
 initialState,
 reducers: {},
 extraReducers: (builder) => {
  builder
   // handle get all users
   .addCase(getAllUsers.pending, (state) => {
    state.usersLoading = true;
    state.usersError = null;
   })
   .addCase(getAllUsers.fulfilled, (state, action) => {
    state.usersLoading = false;
    state.users = action.payload;
   })
   .addCase(getAllUsers.rejected, (state, action) => {
    state.usersLoading = false;
    state.usersError = action.payload.error || "Failed to fetch users";
   })
   // handle create new user
   .addCase(createNewUser.pending, (state) => {
    state.usersLoading = true;
    state.usersError = null;
   })
   .addCase(createNewUser.fulfilled, (state, action) => {
    state.usersLoading = false;
    state.users.push(action.payload.user);
   })
   .addCase(createNewUser.rejected, (state, action) => {
    state.usersLoading = false;
    state.usersError = action.payload.error || "Failed to create new user";
   })
   // handle update user
   .addCase(updateUser.pending, (state) => {
    state.usersLoading = true;
    state.usersError = null;
   })
   .addCase(updateUser.fulfilled, (state, action) => {
    state.usersLoading = false;
    const index = state.users.findIndex(
     (user) => user._id === action.payload.user._id
    );
    if (index !== -1) {
     state.users[index] = action.payload.user;
    }
   })
   .addCase(updateUser.rejected, (state, action) => {
    state.usersLoading = false;
    state.usersError = action.payload.error || "Failed to update user";
   })
   // handle delete user
   .addCase(deleteUser.pending, (state) => {
    state.usersLoading = true;
    state.usersError = null;
   })
   .addCase(deleteUser.fulfilled, (state, action) => {
    state.usersLoading = false;
    state.users = state.users.filter((user) => user._id !== action.payload);
   })
   .addCase(deleteUser.rejected, (state, action) => {
    state.usersLoading = false;
    state.usersError = action.payload.error || "Failed to delete user";
   })
   // handle get all products
   .addCase(getAllProducts.pending, (state) => {
    state.productsLoading = true;
    state.productsError = null;
   })
   .addCase(getAllProducts.fulfilled, (state, action) => {
    state.productsLoading = false;
    state.products = action.payload;
   })
   .addCase(getAllProducts.rejected, (state, action) => {
    state.productsLoading = false;
    state.productsError = action.payload.error || "Failed to fetch products";
   })
   // handle create product
   .addCase(createProduct.pending, (state) => {
    state.productsLoading = true;
    state.productsError = null;
   })
   .addCase(createProduct.fulfilled, (state, action) => {
    state.productsLoading = false;
    state.products.push(action.payload);
   })
   .addCase(createProduct.rejected, (state, action) => {
    state.productsLoading = false;
    state.productsError = action.payload.error || "Failed to create product";
   })
   // handle update product
   .addCase(updateProduct.pending, (state) => {
    state.productsLoading = true;
    state.productsError = null;
   })
   .addCase(updateProduct.fulfilled, (state, action) => {
    state.productsLoading = false;
    const index = state.products.findIndex(
     (product) => product._id === action.payload._id
    );
    if (index !== -1) {
     state.products[index] = action.payload;
    }
   })
   .addCase(updateProduct.rejected, (state, action) => {
    state.productsLoading = false;
    state.productsError = action.payload.error || "Failed to update product";
   })
   // handle delete product
   .addCase(deleteProduct.pending, (state) => {
    state.productsLoading = true;
    state.productsError = null;
   })
   .addCase(deleteProduct.fulfilled, (state, action) => {
    state.productsLoading = false;
    state.products = state.products.filter(
     (product) => product._id !== action.payload
    );
   })
   .addCase(deleteProduct.rejected, (state, action) => {
    state.productsLoading = false;
    state.productsError = action.payload.error || "Failed to delete product";
   })
   // handle get all orders
   .addCase(getAllOrders.pending, (state) => {
    state.ordersLoading = true;
    state.ordersError = null;
   })
   .addCase(getAllOrders.fulfilled, (state, action) => {
    state.ordersLoading = false;
    state.orders = action.payload.orders;
    state.totalOrders = action.payload.totalOrders;
    state.totalSales = action.payload.totalSales;
   })
   .addCase(getAllOrders.rejected, (state, action) => {
    state.ordersLoading = false;
    state.ordersError = action.payload.error || "Failed to fetch orders";
   })
   // handle update order status
   .addCase(updateOrderStatus.pending, (state) => {
    state.ordersLoading = true;
    state.ordersError = null;
   })
   .addCase(updateOrderStatus.fulfilled, (state, action) => {
    state.ordersLoading = false;
    const index = state.orders.findIndex(
     (order) => order._id === action.payload.order._id
    );
    if (index !== -1) {
     state.orders[index] = action.payload.order;
    }
   })
   .addCase(updateOrderStatus.rejected, (state, action) => {
    state.ordersLoading = false;
    state.ordersError = action.payload.error || "Failed to update order status";
   })
   //  // handle delete order
   .addCase(deleteOrder.pending, (state) => {
    state.ordersLoading = true;
    state.ordersError = null;
   })
   .addCase(deleteOrder.fulfilled, (state, action) => {
    state.ordersLoading = false;
    state.orders = state.orders.filter((order) => order._id !== action.payload);
   })
   .addCase(deleteOrder.rejected, (state, action) => {
    state.ordersLoading = false;
    state.ordersError = action.payload.error || "Failed to delete order";
   });
 },
});

export default adminSlice.reducer;
