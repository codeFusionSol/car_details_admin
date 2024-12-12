import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ownerId: "",
  loading: false,
  error: "",
};

const ownerIdSlice = createSlice({
  name: "ownerId",
  initialState,
  reducers: {
    changeOwnerIdStart: (state) => {
      state.loading = true;
    },
    changeOwnerIdSuccess: (state, action) => {
      state.loading = false;
      state.ownerId = action.payload;
    },
    changeOwnerIdFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const actions = ownerIdSlice.actions;

export const {
  changeOwnerIdStart,
  changeOwnerIdSuccess,
  changeOwnerIdFailure,
} = actions;

export default ownerIdSlice.reducer;
