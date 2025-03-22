import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProductCombinations,
  addProductCombination,
  updateProductCombination,
} from "../services/api.js";

//  Fetch Product Combinations
export const fetchProductCombinations = createAsyncThunk(
  "productCombinations/fetchProductCombinations",
  async () => {
    return await getProductCombinations();
  }
);

//  Add New Product Combination
export const createProductCombination = createAsyncThunk(
  "productCombinations/addProductCombination",
  async (combinationData, { rejectWithValue }) => {
    try {
      //  Add new combination to the database
      await addProductCombination(combinationData);

      //  Fetch updated product combinations
      const updatedCombinations = await getProductCombinations();

      return updatedCombinations; // Return fresh data to update Redux state
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

//  Update Product Combination
export const modifyProductCombination = createAsyncThunk(
  "productCombinations/updateProductCombination",
  async ({ id, updatedData }) => {
    return await updateProductCombination(id, updatedData);
  }
);

//  Product Combination Slice
const productCombinationSlice = createSlice({
  name: "productCombinations",
  initialState: { combinations: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductCombinations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductCombinations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.combinations = action.payload;
      })
      .addCase(fetchProductCombinations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createProductCombination.fulfilled, (state, action) => {
        state.combinations = action.payload;
      })
      .addCase(modifyProductCombination.fulfilled, (state, action) => {
        const index = state.combinations.findIndex(
          (comb) => comb._id === action.payload._id
        );
        if (index !== -1) {
          state.combinations[index] = action.payload;
        }
      });
  },
});

export default productCombinationSlice.reducer;
