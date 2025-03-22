import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts, addProduct } from "../services/api.js";

// Async Thunks for API calls
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    return await getProducts();
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (product) => {
    return await addProduct(product);
  }
);

// Product Slice
const productSlice = createSlice({
  name: "products",
  initialState: { products: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      });
  },
});

export default productSlice.reducer;
