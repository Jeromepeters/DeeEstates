import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.error = null;
      state.loading = false;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;

      state.loading = false;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserStart: (state, action) => {
      state.loading = true;
    },
    updateUserfail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signOutSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    signOutStart: (state, action) => {
      state.loading = true;
    },
    signOutfail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserSuccess: (state, action) => {
      (state.currentUser = null), (state.loading = false);
      state.error = null;
    },
    deleteUserStart: (state, action) => {
      state.loading = true;
    },
    deleteUserfail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

console.log(userSlice);

export const {
  signInFailure,
  signInStart,
  signInSuccess,
  signOutStart,
  signOutSuccess,
  signOutfail,
  updateUserStart,
  updateUserSuccess,
  updateUserfail,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserfail,
} = userSlice.actions;

export default userSlice.reducer;
