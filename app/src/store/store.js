import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../slices/productSlice.js";
import materialReducer from "../slices/materialSlice.js";
import gradeReducer from "../slices/gradeSlice.js";
import combinationReducer from "../slices/combinationSlice.js";

const store = configureStore({
  reducer: {
    products: productReducer,
    materials: materialReducer,
    grades: gradeReducer,
    productCombinations: combinationReducer,
  },
});

export default store;
