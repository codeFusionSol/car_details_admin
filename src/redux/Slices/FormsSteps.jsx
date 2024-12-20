import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  steps: 1,
  loading: false,
  error: "",
};

const formsStepsSlice = createSlice({
  name: "formsSteps",
  initialState,
  reducers: {
    changeStepStart: (state) => {
      state.loading = true;
    },
    changeStepSuccess: (state, action) => {
      state.loading = false;
      state.steps = action.payload;
    },
    changeStepFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const actions = formsStepsSlice.actions;

export const { changeStepStart, changeStepSuccess, changeStepFailure } =
  actions;

export default formsStepsSlice.reducer;
