import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cars: [],
  loading: false,
  error: "",
};

const carDetailsIdSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    getCarsStart: (state) => {
      state.loading = true;
    },
    getCarsSuccess: (state, action) => {
      state.loading = false;
      state.cars = action.payload;
    },
    getCarsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    resetCars: (state) => {
      state.cars = [];
    },
  },
});

const actions = carDetailsIdSlice.actions;

export const { getCarsStart, getCarsSuccess, getCarsFailure, resetCars } =
  actions;

export default carDetailsIdSlice.reducer;
