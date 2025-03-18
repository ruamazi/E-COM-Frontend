import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL, sendTokenHeader } from "../../constants";

const loadCartFromStorage = () => {
 const cart = localStorage.getItem("cart");
 if (cart) {
  return JSON.parse(cart);
 }
 return { products: [] };
};
const saveCartToStorage = (cart) => {
 localStorage.setItem("cart", JSON.stringify(cart));
};

export const getCart = createAsyncThunk(
 "cart/getCart",
 async ({ userId, guestId }, { rejectWithValue }) => {
  try {
   const response = await axios.get(`${API_URL}/api/cart/get-cart`, {
    params: {
     userId,
     guestId,
    },
   });
   return response.data;
  } catch (error) {
   console.log(error);
   return rejectWithValue(error.response.data);
  }
 }
);

export const addToCart = createAsyncThunk(
 "cart/addToCart",
 async (
  { productId, size, color, guestId, userId, quantity },
  { rejectWithValue }
 ) => {
  try {
   const response = await axios.post(
    `${API_URL}/api/cart/add-to-cart`,
    {
     productId,
     size,
     color,
     quantity,
     guestId,
     userId,
    },
    sendTokenHeader
   );
   return response.data;
  } catch (error) {
   console.log(error);
   return rejectWithValue(error.response.data);
  }
 }
);

export const updateProductQuantity = createAsyncThunk(
 "cart/updateProductQuantity",
 async (
  { productId, size, color, guestId, userId, quantity },
  { rejectWithValue }
 ) => {
  try {
   const response = await axios.put(
    `${API_URL}/api/cart/update-product-quantity`,
    {
     productId,
     size,
     color,
     quantity,
     guestId,
     userId,
    }
   );
   return response.data;
  } catch (error) {
   console.log(error);
   return rejectWithValue(error.response.data);
  }
 }
);

export const removeFromCart = createAsyncThunk(
 "cart/removeFromCart",
 async ({ productId, size, color, guestId, userId }, { rejectWithValue }) => {
  try {
   const response = await axios.delete(`${API_URL}/api/cart/remove-from-cart`, {
    data: {
     productId,
     size,
     color,
     guestId,
     userId,
    },
   });
   return response.data;
  } catch (error) {
   console.log(error);
   return rejectWithValue(error.response.data);
  }
 }
);

export const mergeGuestCartIntoUserCart = createAsyncThunk(
 "cart/mergeGuestCartIntoUserCart",
 async ({ guestId, user }, { rejectWithValue }) => {
  try {
   const response = await axios.post(
    `${API_URL}/api/cart/merge-guest-cart`,
    {
     guestId,
     user,
    },
    sendTokenHeader
   );
   return response.data;
  } catch (error) {
   console.log(error);
   return rejectWithValue(error.response.data);
  }
 }
);

const initialState = {
 cart: loadCartFromStorage(),
 loading: false,
 error: null,
};

const cartSlice = createSlice({
 name: "cart",
 initialState,
 reducers: {
  clearCart: (state) => {
   state.cart = { products: [] };
   saveCartToStorage(state.cart);
  },
 },
 extraReducers: (builder) => {
  builder
   // add to cart
   .addCase(addToCart.pending, (state) => {
    state.loading = true;
    state.error = null;
   })
   .addCase(addToCart.fulfilled, (state, action) => {
    state.loading = false;
    state.cart = action.payload;
    saveCartToStorage(state.cart);
   })
   .addCase(addToCart.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload?.error || "Failed to add product to cart";
   })
   // remove from cart
   .addCase(removeFromCart.pending, (state) => {
    state.loading = true;
    state.error = null;
   })
   .addCase(removeFromCart.fulfilled, (state, action) => {
    state.loading = false;
    state.cart = action.payload;
    saveCartToStorage(state.cart);
   })
   .addCase(removeFromCart.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload?.error || "Failed to remove product from cart";
   })
   // update product quantity
   .addCase(updateProductQuantity.pending, (state) => {
    state.loading = true;
    state.error = null;
   })
   .addCase(updateProductQuantity.fulfilled, (state, action) => {
    state.loading = false;
    state.cart = action.payload;
    saveCartToStorage(state.cart);
   })
   .addCase(updateProductQuantity.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload.error || "Failed to update product quantity";
   })
   // fetch cart
   .addCase(getCart.pending, (state) => {
    state.loading = true;
    state.error = null;
   })
   .addCase(getCart.fulfilled, (state, action) => {
    state.loading = false;
    state.cart = action.payload;
    saveCartToStorage(state.cart);
   })
   .addCase(getCart.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload.error || "Failed to fetch cart";
   })
   // merge guest cart into user cart
   .addCase(mergeGuestCartIntoUserCart.pending, (state) => {
    state.loading = true;
    state.error = null;
   })
   .addCase(mergeGuestCartIntoUserCart.fulfilled, (state, action) => {
    state.loading = false;
    state.cart = action.payload;
    saveCartToStorage(state.cart);
   })
   .addCase(mergeGuestCartIntoUserCart.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload.error || "Failed to merge guest cart";
   });
 },
});

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;
