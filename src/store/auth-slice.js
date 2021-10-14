import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    role: "gust",
    loading: true,
    user: null,
    errorMessage: "",
  },
  reducers: {
    login(state, action) {
      console.log("auth_slice--> login :", { ...action.payload });
      localStorage.setItem("token", action.payload.token);
      state.token = action.payload.token;
      state.isAuthenticated = true;
      //Array from response
      state.role = action.payload.role[0].authority;
      state.user = action.payload.user;
    },
    loadUser(state, action) {
      console.log("auth_slice--> loadUser :", { ...action.payload });
      state.token = localStorage.getItem("token");
      state.isAuthenticated = true;
      state.role = action.payload.role;
      state.loading = false;
      state.user = action.payload.user;
    },
    logout(state) {
      localStorage.setItem("token", "error token");
      state.token = null;
      state.isAuthenticated = false;
      state.role = "guest";
      state.loading = false;
      state.user = null;
    },
    //no register
    registerSuccess(state, action) {},
    //no register
    registerFail(state, action) {},
    loginError(state, action) {
      localStorage.removeItem("token");
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.role = "gust";
      state.errorMessage = action.payload;
      // state.error = true
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
