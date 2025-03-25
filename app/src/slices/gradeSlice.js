import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addGrade, getGrades } from "../services/api";

//  Fetch Grades
export const fetchGrades = createAsyncThunk("grades/fetchGrades", async () => {
  return await getGrades();
});

//  Add Grade
export const createGrade = createAsyncThunk(
  "grades/createGrade",
  async (gradeData) => {
    return await addGrade(gradeData);
  }
);

const gradeSlice = createSlice({
  name: "grades",
  initialState: { grades: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGrades.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGrades.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.grades = action.payload;
      })
      .addCase(fetchGrades.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createGrade.fulfilled, (state, action) => {
        state.grades.push(action.payload);
      });
  },
});

export default gradeSlice.reducer;
