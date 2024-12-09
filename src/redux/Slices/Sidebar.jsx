import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formState: false,
  isOpen: false,
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
    changeSidebarState: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

const actions = sidebarSlice.actions;

export const {
  changeFormStateStart,
  changeFormStateSuccess,
  changeFormStateFailure,
  changeSidebarState,
} = actions;

export default sidebarSlice.reducer;
