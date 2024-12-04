import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carDetailsId: "",
  loading: false,
  error: "",
};

const carDetailsIdSlice = createSlice({
  name: "carDetailsId",
  initialState,
  reducers: {
    changeCarDetailsIdStart: (state) => {
      state.loading = true;
    },
    changeCarDetailsIdSuccess: (state, action) => {
      state.loading = false;
      state.carDetailsId = action.payload;
    },
    changeCarDetailsIdFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const actions = carDetailsIdSlice.actions;

export const { changeCarDetailsIdStart, changeCarDetailsIdSuccess, changeCarDetailsIdFailure } =
  actions;

export default carDetailsIdSlice.reducer;
