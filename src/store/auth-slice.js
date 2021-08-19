import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    role: "guest",
    loading: true,
    user: null,
  },
  reducers: {
    login(state, action) {
      console.log("payload", action.payload);
      localStorage.setItem("token", action.payload.token);
      state.token = action.payload.token;
      state.isAuthenticated = true;
      //Array from response
      state.role = action.payload.role[0];
      // state.loading = false;
      state.user = action.payload.user;
    },
    loadUser(state, action) {
      console.log("load user reducer", localStorage.getItem("token"));
      state.token = localStorage.getItem("token");
      state.isAuthenticated = true;
      state.role = action.payload.role;
      state.loading = false;
      state.user = action.payload.user;
    },
    logout(state) {
      console.log("logged out");
      localStorage.removeItem("token");
      state.token = null;
      state.isAuthenticated = false;
      state.role = "guest";
      state.loading = false;
      state.user = null;
    },
    registerSuccess(state, action) {},
    registerFail(state, action) {},
    loginError(state) {
      // localStorage.removeItem("token");
      // state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      console.log("register fail auth error");
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
