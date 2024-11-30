import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formState: false,
  loading: false,
  error: "",
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    changeFormStateStart: (state) => {
      state.loading = true;
    },
    changeFormStateSuccess: (state, action) => {
      state.loading = false;
      state.formState = !state.formState;
    },
    changeFormStateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const actions = sidebarSlice.actions;

export const {
  changeFormStateStart,
  changeFormStateSuccess,
  changeFormStateFailure,
} = actions;

export default sidebarSlice.reducer;
