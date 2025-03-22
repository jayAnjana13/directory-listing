import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addMaterial, getMaterials } from "../services/api";

// ✅ Fetch Materials
export const fetchMaterials = createAsyncThunk(
  "materials/fetchMaterials",
  async () => {
    return await getMaterials();
  }
);

// ✅ Add Material
export const createMaterial = createAsyncThunk(
  "materials/createMaterial",
  async (materialData) => {
    return await addMaterial(materialData);
  }
);

const materialSlice = createSlice({
  name: "materials",
  initialState: { materials: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMaterials.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMaterials.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.materials = action.payload;
      })
      .addCase(fetchMaterials.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createMaterial.fulfilled, (state, action) => {
        state.materials.push(action.payload);
      });
  },
});

export default materialSlice.reducer;
