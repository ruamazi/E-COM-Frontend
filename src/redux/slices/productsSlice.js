import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL, sendTokenHeader } from "../../constants";

export const fetchProductsByFilter = createAsyncThunk(
 "products/fetchProductsByFilter",
 async ({
  collection,
  size,
  color,
  gender,
  minPrice,
  maxPrice,
  sortBy,
  search,
  category,
  material,
  brand,
  limit,
 }) => {
  const query = new URLSearchParams();
  if (collection) query.append("collection", collection);
  if (size) query.append("size", size);
  if (color) query.append("color", color);
  if (gender) query.append("gender", gender);
  if (minPrice) query.append("minPrice", minPrice);
  if (maxPrice) query.append("maxPrice", maxPrice);
  if (sortBy) query.append("sortBy", sortBy);
  if (search) query.append("search", search);
  if (category) query.append("category", category);
  if (material) query.append("material", material);
  if (brand) query.append("brand", brand);
  if (limit) query.append("limit", limit);
  const response = await axios.get(
   `${API_URL}/api/products/all-by-sort?${query.toString()}`
  );
  return response.data;
 }
);
export const fetchProductById = createAsyncThunk(
 "products/fetchProductById",
 async (id) => {
  const response = await axios.get(
   `${API_URL}/api/products/single-product/${id}`
  );
  return response.data;
 }
);

// export const updateProduct = createAsyncThunk(
//  "products/updateProduct",
//  async (id, productData) => {
//   const response = await axios.put(
//    `${API_URL}/api/products/update/${id}`,
//    productData,
//    sendTokenHeader
//   );
//   return response.data;
//  }
// );

export const fetchSimilarProducts = createAsyncThunk(
 "products/fetchSimilarProducts",
 async (id) => {
  const response = await axios.get(
   `${API_URL}/api/products/similar-products/${id}`
  );
  return response.data;
 }
);

const initialState = {
 products: [],
 selectedProduct: null,
 similarProducts: [],
 filters: {
  category: "",
  size: "",
  color: "",
  gender: "",
  brand: "",
  minPrice: 0,
  maxPrice: 100,
  sortBy: "",
  search: "",
  material: "",
  collection: "",
 },
 loading: false,
 error: null,
};

const productsSlice = createSlice({
 name: "products",
 initialState,
 reducers: {
  setFilters: (state, action) => {
   state.filters = { ...state.filters, ...action.payload };
  },
  clearFilters: (state) => {
   state.filters = initialState.filters;
  },
 },
 extraReducers: (builder) => {
  builder
   // handle fetch products by filter
   .addCase(fetchProductsByFilter.pending, (state) => {
    state.loading = true;
    state.error = null;
   })
   .addCase(fetchProductsByFilter.fulfilled, (state, action) => {
    state.loading = false;
    state.products = Array.isArray(action.payload) ? action.payload : [];
   })
   .addCase(fetchProductsByFilter.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.error || "Failed to fetch products";
   })
   // handle fetch product by id
   .addCase(fetchProductById.pending, (state) => {
    state.loading = true;
    state.error = null;
   })
   .addCase(fetchProductById.fulfilled, (state, action) => {
    state.loading = false;
    state.selectedProduct = action.payload;
   })
   .addCase(fetchProductById.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.error || "Failed to fetch product";
   });
  builder
   // handle update product
   //  .addCase(updateProduct.pending, (state) => {
   //   state.loading = true;
   //   state.error = null;
   //  })
   //  .addCase(updateProduct.fulfilled, (state, action) => {
   //   state.loading = false;
   //   const updatedProduct = action.payload;
   //   const index = state.products.findIndex(
   //    (product) => product._id === updatedProduct._id
   //   );
   //   if (index !== -1) {
   //    state.products[index] = updatedProduct;
   //   }
   //  })
   //  .addCase(updateProduct.rejected, (state, action) => {
   //   state.loading = false;
   //   state.error = action.error.error || "Failed to update product";
   //  })
   // handle similar products
   .addCase(fetchSimilarProducts.pending, (state) => {
    state.loading = true;
    state.error = null;
   })
   .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
    state.loading = false;
    state.similarProducts = action.payload;
   })
   .addCase(fetchSimilarProducts.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.error || "Failed to fetch similar products";
   });
 },
});

export const { setFilters, clearFilters } = productsSlice.actions;

export default productsSlice.reducer;
