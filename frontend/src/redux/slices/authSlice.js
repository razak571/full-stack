import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userinfo: "",
  status: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegisterData: (state, action) => {
      state.userinfo = action.payload;
      state.status = true;
    },
  },
});

export const { userRegisterData } = authSlice.actions;

export default authSlice.reducer;
