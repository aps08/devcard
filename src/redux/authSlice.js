import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userType: null
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setAuthAndUserType: (state, action) => {
      const { isLoggedIn, user } = action.payload;
      state.isLoggedIn = isLoggedIn;
      state.user = user;
    },
    reset: (state) => {
      Object.assign(state, initialState);
    }
  }
});

export const { setAuthAndUserType, reset } = authSlice.actions;
export default authSlice.reducer;
