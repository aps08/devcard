import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    userType: null
  },
  reducers: {
    setAuth: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setUserType: (state, action) => {
      state.userType = action.payload;
    }
  }
});

export const { setAuth, setUserType } = authSlice.actions;
export default authSlice.reducer;
