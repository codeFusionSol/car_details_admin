import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carDetailsId: "",
  fullDetaills: [],
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
      // save the data in local storage
      localStorage.setItem("carDetailsId", JSON.stringify(state.carDetailsId));
    },
    changeCarDetailsIdFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    addDataToCarDetailsStart: (state, action) => {
      state.loading = true;
    },
    addDataToCarDetailsSuccess: (state, action) => {
      state.loading = false;
      state.fullDetaills = [...state.fullDetaills, action.payload];
      // save the data in local storage
      let details = JSON.parse(localStorage.getItem("fullDetaills")) || [];
      details = [...details, action.payload];
      localStorage.setItem("fullDetaills", JSON.stringify(details));
    },
    addDataToCarDetailsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateDataToCarDetailsStart: (state, action) => {
      state.loading = true;
    },
    updateDataToCarDetailsSuccess: (state, action) => {
      state.loading = false;
      state.fullDetaills = state.fullDetaills.map(detail => 
        detail._id === action.payload._id ? action.payload : detail
      );
      // save the data in local storage
      let details = JSON.parse(localStorage.getItem("fullDetaills")) || [];
      details = details.map(detail =>
        detail._id === action.payload._id ? action.payload : detail
      );
      localStorage.setItem("fullDetaills", JSON.stringify(details));
    },
    updateDataToCarDetailsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    setDataToCarDetails: (state, action) => {
      state.fullDetaills = action.payload;
    },

    resetCarDetailsId: (state) => {
      state.carDetailsId = "";
      state.fullDetaills = [];
    },
  },
});

const actions = carDetailsIdSlice.actions;

export const {
  changeCarDetailsIdStart,
  changeCarDetailsIdSuccess,
  changeCarDetailsIdFailure,
  addDataToCarDetailsStart,
  addDataToCarDetailsSuccess,
  addDataToCarDetailsFailure,
  updateDataToCarDetailsStart,
  updateDataToCarDetailsSuccess,
  updateDataToCarDetailsFailure,
  setDataToCarDetails,
  resetCarDetailsId,
} = actions;

export default carDetailsIdSlice.reducer;
